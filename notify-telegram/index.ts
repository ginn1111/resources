console.log("bot starting...");

import TelegramBot from "node-telegram-bot-api";
import puppeteer from "puppeteer";

const token = "6912132253:AAFGatDedAmj9aMhM28cEK6eFfDwq9BVLRM";

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message
  //
  console.log("[EVENT]");

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

bot.on("message", async (msg, metadata) => {
  const chatId = msg.chat.id;
  console.log(chatId);
  await (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      "https://app.daily.dev/?utm_source=landing&utm_medium=cta&utm_campaign=landing_conversions",
    );

    const pageContent = await page.content();

    console.log(pageContent);

    bot.sendMessage(5743435954, pageContent);
    browser.close();
  })();
});

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://app.daily.dev/?utm_source=landing&utm_medium=cta&utm_campaign=landing_conversions",
  );

  bot.sendMessage(5743435954, await page.content());
  browser.close();
})();
