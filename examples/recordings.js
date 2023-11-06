require("dotenv").config();

const bbb = require("../src");
const api = bbb.api(process.env.BBB_URL, process.env.BBB_SECRET);
const http = bbb.http;

const recordingsUrl = api.recording.getRecordings();

const run = async () => {
  const result = await http(recordingsUrl);
  console.log(JSON.stringify(result));
};

run();
