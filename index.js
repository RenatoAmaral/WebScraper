const puppeteer = require('puppeteer');
const fs = require('fs-extra');

(async function main() {
  try {
    
    const browser = await puppeteer.launch({ headless: false});
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/67.0.3372.0 Safari/537.36');
 
    await page.goto('https://google.com/');

    // Type into search box.
    await page.type('#gs_lc0 input', 'datatables');

    // Wait for searched text to appear and click "Search".
    const resultsSelector = 'input[type="button"][value="Google Search"]';
    await page.waitForSelector(resultsSelector);
    await page.click(resultsSelector);

    // Wait for suggest overlay to appear and click "https://datatables.net/".
    const targetSelector = 'a[href="https://datatables.net/"';
    await page.waitForSelector(targetSelector);
    await page.click(targetSelector);

    // Wait for the results page to load and extract data from table.



    // Convert extrated data from table to a CSV

    await fs.writeFile('table.csv', 'Name,Position,Office,Age,Start date');
    
    for ( i=0 ; i <= 6 ; i++ ) {
        await fs.appendFile('table.csv', `"name${i}","Cashier","Montreal","${i}","Position${i}"\n` );

    }
   
   
    console.log('it is showing', table);
    
    
    
    await browser.close();
  } catch (e) {
    console.log('our error', e);

  }
})();



// Your task is to write a webscraper that performs the following tasks:

//     a) Navigate to https://datatables.net/ by typing "datatables" into google search, and clicking on the correct result.

//     b) You will find a table example with some data. Please fetch/extract data from table into array.
//     In the array you will have objects. An object will be a row from the table. The object properties will be data from every table column.
//     Hint: Many javascript scraping frameworks like Puppetteer and Nightmare implement a .evaluate which would allow you to use .map(function(){ // return object with data }).toArray() from Jquery.

//     c) Please export the array as a CSV