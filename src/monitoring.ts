import { constructUrl } from "./util";

function monitoring(options: {
	salt: string;
	hashMethod: string;
	host: string;
}) {
	function getMeetingInfo(meetingID: string) {
		let qparams = {
			meetingID: meetingID,
		};

		return constructUrl(options, "getMeetingInfo", qparams);
	}
	function isMeetingRunning(meetingID: string) {
		let qparams = {
			meetingID: meetingID,
		};

		return constructUrl(options, "isMeetingRunning", qparams);
	}
	function getMeetings() {
		let qparams = {};

		return constructUrl(options, "getMeetings", qparams);
	}
	return {
		getMeetingInfo,
		isMeetingRunning,
		getMeetings,
	};
}

module.exports = monitoring;
