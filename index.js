const puppeteer = require('puppeteer');

(async function main() {
  try {
    
    const browser = await puppeteer.launch({ headless: false});
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/67.0.3372.0 Safari/537.36');
 
    await page.goto('https://google.com/');

    // Type into search box.
    await page.type('#gs_lc0 input', 'datatables');

    // Wait for suggest overlay to appear and click "show all results".
    const allResultsSelector = 'input[type="button"][value="Google Search"]';
    await page.waitForSelector(allResultsSelector);
    await page.click(allResultsSelector);

    // Wait for suggest overlay to appear and click "https://datatables.net/".
    const targetSelector = 'a[href="https://datatables.net/"';
    await page.waitForSelector(targetSelector);
    await page.click(targetSelector);

    // Wait for the results page to load and display the results.
    

    console.log('it is showing');
 
 
    
    await browser.close();
  } catch (e) {
    console.log('our error', e);

  }
})();
