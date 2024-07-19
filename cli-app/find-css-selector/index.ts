import * as cheerio from "cheerio";
import pupppeteer from "puppeteer";

(async () => {
  const URL_REGEX =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  const [, , url, selector] = process.argv;
  if (!URL_REGEX.test(url)) {
    console.error(`URL ${url} is not valid`);
    return;
  }
  console.log("Loading web content from url ...");

  const browser = await pupppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const content = await page.content();

  const $ = cheerio.load(content);

  console.log($(selector).html());
})();

