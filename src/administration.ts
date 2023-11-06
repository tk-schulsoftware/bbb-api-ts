import { constructUrl } from "./util";

export function administration(options: {
  salt: string;
  hashMethod: string;
  host: string;
}) {
  function create(name: string, id: string, kwparams: Record<string, string>) {
    kwparams = { ...kwparams };
    kwparams.name = name;
    kwparams.meetingID = id;

    return constructUrl(options, "create", kwparams);
  }

  function join(
    fullName: string,
    meetingID: string,
    password: string,
    kwparams: Record<string, string>,
  ) {
    kwparams = { ...kwparams };
    kwparams.fullName = fullName;
    kwparams.meetingID = meetingID;
    kwparams.password = password;

    return constructUrl(options, "join", kwparams);
  }

  function end(meetingID: string, password: string) {
    const kwparams = {
      meetingID,
      password,
    };
    return constructUrl(options, "end", kwparams);
  }

  return {
    create,
    join,
    end,
  };
}
