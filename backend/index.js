const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

async function autoScroll(page, durationInSeconds) {
  const maxScrollTime = durationInSeconds * 1000; 
  const interval = 50; // Adjust the interval (milliseconds) for smoother scrolling

  // Start scrolling
  await page.evaluate(
    async (maxScrollTime, interval) => {
      const startTime = new Date().getTime();

      const scrollStep = 85; // Adjust the scroll step for smoother scrolling

      await new Promise((resolve) => {
        const scrollInterval = setInterval(() => {
          window.scrollBy(0, scrollStep);
          const elapsedTime = new Date().getTime() - startTime;

          if (elapsedTime > maxScrollTime) {
            clearInterval(scrollInterval);
            resolve();
          }
        }, interval);
      });
    },
    maxScrollTime,
    interval
  );
}

const scrapeWebsite = async (params, quantity) => {
  try {
    const url = `https://lexica.art/?&q=${params}`;
    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();
    if (quantity == "") {
    } else if (quantity == "50-100") {
      await page.setViewport({ width: 2300, height: 1000 });
    } else if (quantity == "100-150") {
      await page.setViewport({ width: 3600, height: 1100 });
    } else if (quantity == "200-300") {
      await page.setViewport({ width: 5600, height: 1400 });
    } else if (quantity == "300-500") {
      await page.setViewport({ width: 7000, height: 2300 });
    }

    await page.goto(url, { timeout: 60000 });
    await page.waitForTimeout(3000);

    await autoScroll(page, 15);

    const pageContent = await page.content();
    await browser.close();

    const $ = cheerio.load(pageContent);
    const targetElement = $("div.mt-3.relative.px-2.md\\:px-7.w-full");

    if (targetElement.length > 0) {
      const imgTags = targetElement.find("img");
      const imageUrl = imgTags
        .map((index, element) => {
          const srcAttribute = $(element).attr("src");

          if (srcAttribute) {
            return srcAttribute.substring(34);
          } else {
            console.error("srcAttribute is undefined for an image.");
            return null;
          }
        })
        .get();

      return imageUrl;
    } else {
      throw new Error("Target element not found.");
    }
  } catch (error) {
    console.error("Error during scraping:", error.message);
    throw error;
  }
};

app.post("/generateImage", async (req, res) => {
  const params = req.body.search;
  const quantity = req.body.quantity;
  try {
    const images = await scrapeWebsite(params, quantity);
    console.log(images.length);
    res.json({ images });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 1000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
