import axios from "axios";
import querystring from "querystring";
import crypto from "crypto";
import parser from "fast-xml-parser";

function getChecksum(callName, queryParams, sharedSecret, hashMethod = "sha1") {
	return crypto[hashMethod]()
		.update(`${callName}${querystring.encode(queryParams)}${sharedSecret}`)
		.digest("hex");
}

export function constructUrl(options, action, params) {
	params.checksum = getChecksum(
		action,
		params,
		options.salt,
		options.hashMethod
	);
	return `${options.host}/api/${action}?${querystring.encode(params)}`;
}

export function httpClient(url) {
	return axios(url, {
		headers: { Accept: "text/xml, application/json, text/plain, */*" },
	})
		.then((response) => {
			return response.data;
		})
		.then(function (xml) {
			return parseXml(xml);
		});
}

export function normalizeUrl(url: string) {
	return /\/$/.test(url) ? url.slice(0, -1) : url;
}

export function getPathname(url: string, host: string) {
	return url.replace(host, "");
}

export function parseXml(xml: string) {
	const json = parser.parse(xml).response;

	if (json.meetings) {
		let meetings = json.meetings ? json.meetings.meeting : [];
		meetings = Array.isArray(meetings) ? meetings : [meetings];
		json.meetings = meetings;
	}
	if (json.recordings) {
		let recordings = json.recordings ? json.recordings.recording : [];
		recordings = Array.isArray(recordings) ? recordings : [recordings];
		json.recordings = recordings;
	}
	return json;
}
