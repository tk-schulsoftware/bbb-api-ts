import { constructUrl } from "./util";

function recording(options: { salt: string; hashMethod: string; host: string; }) {
	function getRecordings(kwparams: any) {
		kwparams = { ...kwparams };

		return constructUrl(options, "getRecordings", kwparams);
	}
	function publishRecordings(recordID: string, publish) {
		let qparams = {
			recordID: recordID,
			publish: publish,
		};

		return constructUrl(options, "publishRecordings", qparams);
	}
	function deleteRecordings(recordID: string) {
		let qparams = {
			recordID: recordID,
		};

		return constructUrl(options, "deleteRecordings", qparams);
	}
	function updateRecordings(recordID: string, kwparams) {
		kwparams = { ...kwparams };

		kwparams.recordID = recordID;

		return constructUrl(options, "updateRecordings", kwparams);
	}
	return {
		getRecordings,
		publishRecordings,
		deleteRecordings,
		updateRecordings,
	};
}

module.exports = recording;
