import { normalizeUrl } from "./util";

type ApiOptions = {
	host?: string;
	salt?: string;
};

export function api(host: string, salt: string, options: ApiOptions = {}) {
	options.host = normalizeUrl(host);
	options.salt = salt;

	let administration = require("./administration")(options);
	let monitoring = require("./monitoring")(options);
	let recording = require("./recording")(options);
	let hooks = require("./hooks")(options);

	return {
		administration,
		monitoring,
		recording,
		hooks,
	};
}
