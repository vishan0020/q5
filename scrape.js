const { chromium } = require('playwright');

const seeds = Array.from({ length: 10 }, (_, i) => 66 + i);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let total = 0;

  for (const seed of seeds) {
    const url = `https://d3dyfaf3iutrxo.cloudfront.net/general/upload/seed${seed}.html`;
    await page.goto(url);
    const tables = await page.$$('table');

    for (const table of tables) {
      const rows = await table.$$('tr');
      for (const row of rows) {
        const cells = await row.$$('td');
        for (const cell of cells) {
          const text = await cell.textContent();
          const number = parseFloat(text.replace(/,/g, ''));
          if (!isNaN(number)) total += number;
        }
      }
    }
  }

  console.log(`Total sum: ${total}`);
  await browser.close();
})();
