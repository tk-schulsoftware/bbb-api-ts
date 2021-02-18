import { constructUrl } from "./util";

function monitoring(options) {
	function getMeetingInfo(meetingID) {
		let qparams = {
			meetingID: meetingID,
		};

		return constructUrl(options, "getMeetingInfo", qparams);
	}
	function isMeetingRunning(meetingID) {
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
