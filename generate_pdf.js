const puppeteer = require('puppeteer-core');
const fs = require('fs');

const paths = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
];

let executablePath = '';
for (const p of paths) {
  if (fs.existsSync(p)) {
    executablePath = p;
    break;
  }
}

if (!executablePath) {
  console.error('No browser found!');
  process.exit(1);
}

(async () => {
  try {
    const browser = await puppeteer.launch({ executablePath });
    const page = await browser.newPage();
    await page.goto('file:///c:/Users/Admin/Desktop/portfolio/public/CV_Ayari_Rayen_Pro.html', {waitUntil: 'networkidle0'});
    await page.pdf({ 
      path: 'c:/Users/Admin/Desktop/portfolio/public/CV_Ayari_Rayen_Logo.pdf', 
      format: 'A4', 
      printBackground: true 
    });
    await browser.close();
    console.log('PDF generated successfully!');
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
})();
