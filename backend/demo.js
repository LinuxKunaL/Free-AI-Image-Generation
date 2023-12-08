const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const scrapeWebsite = async (params) => {
  try {
    const url = `https://lexica.art/?&q=${params}`;
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();

    await page.setViewport({ width: 9000, height: 2000 });
    await page.goto(url, { timeout: 60000 });
    await page.waitForTimeout(3000);

    // Add scrolling for 10 seconds to load more content
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
          return "https://image.lexica.art/full_webp/" + srcAttribute.slice(34);
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

async function autoScroll(page, durationInSeconds) {
  const maxScrollTime = durationInSeconds * 1000; // Convert seconds to milliseconds
  const interval = 50; // Adjust the interval (milliseconds) for smoother scrolling

  // Start scrolling
  await page.evaluate(async (maxScrollTime, interval) => {
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
  }, maxScrollTime, interval);
}

// Example usage
const name = async () => {
  const result = await scrapeWebsite("neon man");
  console.log(result.length);
};
name();

// async function autoScroll(page) {
//   // Start scrolling
//   await page.evaluate(async () => {
//     const scrollStep = 250; // Adjust the scroll step for smoother scrolling
//     let lastHeight = 0;

//     while (true) {
//       // Scroll down
//       window.scrollBy(0, scrollStep);

//       // Wait for a short time to let the content load
//       await new Promise((resolve) => setTimeout(resolve, 100));

//       // Check if the height has changed, indicating new content
//       const newHeight = document.body.scrollHeight;
//       if (newHeight === lastHeight) {
//         break; // No more content to load
//       }

//       lastHeight = newHeight;
//     }
//   });
// }
