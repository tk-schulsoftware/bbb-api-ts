import { constructUrl } from "./util";
import { ApiOptions } from "./api";

export function monitoring(options: ApiOptions) {
  function getMeetingInfo(meetingID: string) {
    const qparams = {
      meetingID,
    };

    return constructUrl(options, "getMeetingInfo", qparams);
  }

  function isMeetingRunning(meetingID: string) {
    const qparams = {
      meetingID,
    };

    return constructUrl(options, "isMeetingRunning", qparams);
  }

  function getMeetings() {
    const qparams = {};

    return constructUrl(options, "getMeetings", qparams);
  }

  return {
    getMeetingInfo,
    isMeetingRunning,
    getMeetings,
  };
}
