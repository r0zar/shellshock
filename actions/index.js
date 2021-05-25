const { IncomingWebhook } = require("@slack/webhook");
const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

async function slack(json) {
  asyncForEach(json, async (i) => {
    await webhook.send({ text: i.FunctionName });
  });
}

const getIds = (list) => list.map((l) => l.id);

module.exports = {
  slack,
  getIds,
};
