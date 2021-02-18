import { constructUrl } from "./util";

export default function administration(options: {
	salt: string;
	hashMethod: string;
	host: string;
}) {
	function create(name: string, id: string, kwparams: any) {
		kwparams = { ...kwparams };
		kwparams.name = name;
		kwparams.meetingID = id;

		return constructUrl(options, "create", kwparams);
	}
	function join(
		fullName: string,
		meetingID: string,
		password: string,
		kwparams: any
	) {
		kwparams = { ...kwparams };
		kwparams.fullName = fullName;
		kwparams.meetingID = meetingID;
		kwparams.password = password;

		return constructUrl(options, "join", kwparams);
	}
	function end(meetingID: string, password: string) {
		let kwparams = {
			meetingID: meetingID,
			password: password,
		};
		return constructUrl(options, "end", kwparams);
	}
	return {
		create,
		join,
		end,
	};
}
