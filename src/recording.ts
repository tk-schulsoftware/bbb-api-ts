import {constructUrl} from "./util";

function recording(options) {
  function getRecordings(kwparams) {
    kwparams = { ...kwparams }

    return constructUrl(options, 'getRecordings', kwparams)
  }
  function publishRecordings(recordID, publish) {
    let qparams = {
      recordID: recordID,
      publish: publish,
    }

    return constructUrl(options, 'publishRecordings', qparams)
  }
  function deleteRecordings(recordID) {
    let qparams = {
      recordID: recordID,
    }

    return constructUrl(options, 'deleteRecordings', qparams)
  }
  function updateRecordings(recordID, kwparams) {
    kwparams = { ...kwparams }

    kwparams.recordID = recordID

    return constructUrl(options, 'updateRecordings', kwparams)
  }
  return {
    getRecordings,
    publishRecordings,
    deleteRecordings,
    updateRecordings,
  }
}

module.exports = recording;
