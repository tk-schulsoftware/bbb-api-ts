import { constructUrl } from "./util";

export default function hooks(options: { salt: string; hashMethod: string; host: string }) {
	function create(callbackURL: string, kwparams: any) {
		kwparams = { ...kwparams };
		kwparams.callbackURL = callbackURL;

		return constructUrl(options, "hooks/create", kwparams);
	}
	function destroy(hookID: string, kwparams: any) {
		kwparams = { ...kwparams };
		kwparams.hookID = hookID;

		return constructUrl(options, "hooks/destroy", kwparams);
	}
	function list(kwparams: any) {
		kwparams = { ...kwparams };
		return constructUrl(options, "hooks/list", kwparams);
	}
	return {
		create,
		destroy,
		list,
	};
}
