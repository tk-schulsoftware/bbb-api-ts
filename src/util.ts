import { createHash } from "node:crypto";
import { encode } from "node:querystring";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { ApiOptions } from "api";

export function getChecksum(
  callName: string,
  queryParams: Record<string, string>,
  sharedSecret: string,
  hashMethod: string = "sha1",
) {
  const hash = createHash(hashMethod);
  return hash
    .update(`${callName}${encode(queryParams)}${sharedSecret}`)
    .digest("hex");
}

export function constructUrl(
  options: ApiOptions,
  action: string,
  params: Record<string, string>,
) {
  params.checksum = getChecksum(
    action,
    params,
    options.salt,
    options.hashMethod,
  );
  return `${options.host}/api/${action}?${encode(params)}`;
}

export async function httpClient(url: string) {
  const response = await axios(url, {
    headers: { Accept: "text/xml, application/json, text/plain, */*" },
  });
  const xml = response.data as string;
  return parseXml(xml);
}

export function normalizeUrl(url: string) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export function getPathname(url: string, host: string) {
  return url.replace(host, "");
}

export function parseXml(xml: string): JSON {
  const parser = new XMLParser({});
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
