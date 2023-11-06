import * as bbb from "../src/index";
import * as assert from "assert";

require("dotenv").config();
const TEST_HOOKS_TIMEOUT = 6000;

const api = bbb.api(process.env.BBB_URL, process.env.BBB_SECRET, {});
const http = bbb.http;

describe("Hooks Module Tests", () => {
  let hookID;
  beforeAll(async () => {
    const response = await http(api.hooks.create("https://mysite.com"));
    hookID = response.hookID;
  });
  afterAll(() => {
    return http(api.hooks.destroy(hookID));
  });

  it("Get Hooks", () => {
    return http(api.hooks.list(hookID)).then((response) => {
      assert.equal(response.returncode, "SUCCESS");
      assert.equal(response.hooks.hook.hookID, hookID);
    });
  });
});

describe("Administration and Monitoring Modules Tests", () => {
  beforeAll(() => {
    return http(
      api.administration.create("Test Meeting", "42", { duration: "1" }),
    );
  });
  afterAll(() => {
    return http(api.administration.end("42", ""));
  });

  it("Get Meetings", () => {
    return http(api.monitoring.getMeetingInfo("42")).then((response) => {
      assert.equal(response.returncode, "SUCCESS");
      assert.equal(response.meetingName, "Test Meeting");
      assert.equal(response.meetingID, "42");
      assert.equal(response.duration, 1);
    });
  });
});
