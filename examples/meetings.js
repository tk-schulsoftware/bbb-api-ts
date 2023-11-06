require("dotenv").config();

const bbb = require("../src");
const api = bbb.api(process.env.BBB_URL, process.env.BBB_SECRET);
const http = bbb.http;

const createUrlOne = api.administration.create("meeting-one", "1", {
  duration: 5,
  attendeePW: "secret",
  moderatorPW: "supersecret",
});

const createUrlTwo = api.administration.create("meeting-two", "2", {
  duration: 5,
  attendeePW: "secret",
  moderatorPW: "supersecret",
});

const endUrlOne = api.administration.end("1", "supersecret");

const endUrlTwo = api.administration.end("2", "supersecret");

const infosUrl = api.monitoring.getMeetings();

const run = async () => {
  await http(createUrlOne);
  await http(createUrlTwo);
  const result = await http(infosUrl);
  console.log(JSON.stringify(result));
  await http(endUrlOne);
  await http(endUrlTwo);
};

run();
