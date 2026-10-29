import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.resolve(__dirname, '../public/brand-logos');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const LOGOS = [
  { name: 'porsche', url: 'https://www.carlogos.org/car-logos/porsche-logo.png' },
  { name: 'ferrari', url: 'https://www.carlogos.org/car-logos/ferrari-logo.png' },
  { name: 'lamborghini', url: 'https://www.carlogos.org/car-logos/lamborghini-logo.png' },
  { name: 'rolls-royce', url: 'https://www.carlogos.org/car-logos/rolls-royce-logo.png' },
  { name: 'bentley', url: 'https://www.carlogos.org/car-logos/bentley-logo.png' },
  { name: 'aston-martin', url: 'https://www.carlogos.org/car-logos/aston-martin-logo.png' },
  { name: 'mclaren', url: 'https://www.carlogos.org/car-logos/mclaren-logo.png' },
  { name: 'mercedes-benz', url: 'https://www.carlogos.org/car-logos/mercedes-benz-logo.png' },
  { name: 'bmw', url: 'https://www.carlogos.org/car-logos/bmw-logo.png' },
  { name: 'audi', url: 'https://www.carlogos.org/car-logos/audi-logo.png' },
  { name: 'bugatti', url: 'https://www.carlogos.org/car-logos/bugatti-logo.png' },
  { name: 'land-rover', url: 'https://www.carlogos.org/car-logos/land-rover-logo.png' },
  { name: 'maserati', url: 'https://www.carlogos.org/car-logos/maserati-logo.png' },
  { name: 'jaguar', url: 'https://www.carlogos.org/car-logos/jaguar-logo.png' },
  { name: 'maybach', url: 'https://www.carlogos.org/car-logos/maybach-logo.png' },
  { name: 'range-rover', url: 'https://www.carlogos.org/car-logos/range-rover-logo.png' },
  { name: 'koenigsegg', url: 'https://www.carlogos.org/car-logos/koenigsegg-logo.png' },
  { name: 'pagani', url: 'https://www.carlogos.org/car-logos/pagani-logo.png' }
];

function downloadFile(item) {
  return new Promise((resolve) => {
    const dest = path.join(outDir, `${item.name}.png`);
    const file = fs.createWriteStream(dest);

    const req = https.get(item.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (redirectRes) => {
          redirectRes.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log(`[OK] ${item.name}.png`);
            resolve(true);
          });
        });
      } else if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`[OK] ${item.name}.png`);
          resolve(true);
        });
      } else {
        console.log(`[FAIL ${res.statusCode}] ${item.name}`);
        resolve(false);
      }
    });

    req.on('error', (err) => {
      console.log(`[ERR] ${item.name}: ${err.message}`);
      resolve(false);
    });
  });
}

async function run() {
  console.log('Downloading official car logo PNGs...');
  for (const item of LOGOS) {
    await downloadFile(item);
  }
  console.log('Finished downloading.');
}

run();

