const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const scrapeWebsite = async (params) => {
  try {
    const url = `https://lexica.art/?&q=${params}`;
    // const url = `https://lexica.art/?model=lexica-aperture-v2&q=${params}`;
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.goto(url, { timeout: 60000 }); 
    await page.waitForTimeout(1000);

    const pageContent = await page.content();
    await browser.close();

    const $ = cheerio.load(pageContent);
    const targetElement = $("div.mt-3.relative.px-2.md\\:px-7.w-full");

    if (targetElement.length > 0) {
      const imgTags = targetElement.find("img");
      const imageUrl = imgTags
        .map((index, element) => {
          const srcAttribute = $(element).attr("src");
          // return "https://image.lexica.art/full_jpg/" + srcAttribute.slice(29); //34 and full_webp
          return "https://image.lexica.art/full_webp/" + srcAttribute.slice(34); //34 and full_webp
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
  try {
    const images = await scrapeWebsite(req.body.search);
    console.log(images);

    res.json({ images });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 1000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
