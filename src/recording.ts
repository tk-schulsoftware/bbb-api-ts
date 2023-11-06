import { constructUrl } from "./util";
import { ApiOptions } from "./api";

export function recording(options: ApiOptions) {
  function getRecordings(kwparams: Record<string, string>) {
    kwparams = { ...kwparams };

    return constructUrl(options, "getRecordings", kwparams);
  }

  function publishRecordings(
    recordID: string,
    publish: Record<string, string>,
  ) {
    const qparams = {
      recordID,
      ...publish,
    };

    return constructUrl(options, "publishRecordings", qparams);
  }

  function deleteRecordings(recordID: string) {
    const qparams = {
      recordID,
    };

    return constructUrl(options, "deleteRecordings", qparams);
  }

  function updateRecordings(
    recordID: string,
    kwparams: Record<string, string>,
  ) {
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
