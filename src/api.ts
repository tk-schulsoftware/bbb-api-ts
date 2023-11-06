import { normalizeUrl } from "./util";
import { monitoring } from "./monitoring";
import { recording } from "./recording";
import { hooks } from "./hooks";
import { administration } from "./administration";

export type ApiOptions = {
  host: string;
  salt: string;
  hashMethod: string;
};

export function api(
  host: string,
  salt: string,
  options: Pick<ApiOptions, "hashMethod">,
) {
  const fullOptions = {
    host: normalizeUrl(host),
    salt,
    ...options,
  };

  return {
    administration: administration(fullOptions),
    monitoring: monitoring(fullOptions),
    recording: recording(fullOptions),
    hooks: hooks(fullOptions),
  };
}
