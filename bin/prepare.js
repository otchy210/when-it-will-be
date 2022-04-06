const fs = require('fs');

// manifest.json
const packageJsonPath = './package.json';
const srcPath = './src/manifest.json';
const destPath = './build/manifest.json';

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath));

const destJson = JSON.parse(fs.readFileSync(srcPath));

['description', 'version'].forEach((field) => {
    destJson[field] = packageJson[field];
});

fs.writeFileSync(destPath, JSON.stringify(destJson, null, 4));

// html files
fs.readdirSync('./src').filter((file) => {
    return file.endsWith('.html');
}).forEach((file) => {
    const srcPath = `./src/${file}`;
    const destPath = `./build/${file}`;
    fs.copyFileSync(srcPath, destPath);
});

// image files
fs.mkdirSync('./build/images', {recursive: true});
fs.readdirSync('./src/images').filter((file) => {
    return file.endsWith('.png');
}).forEach((file) => {
    const srcPath = `./src/images/${file}`;
    const destPath = `./build/images/${file}`;
    fs.copyFileSync(srcPath, destPath);
});

// time-zone files
fs.mkdirSync('./build/time-zones', {recursive: true});
fs.readdirSync('./src/time-zones').filter((file) => {
    return file.endsWith('.json');
}).forEach((file) => {
    const srcPath = `./src/time-zones/${file}`;
    const destPath = `./build/time-zones/${file}`;
    fs.copyFileSync(srcPath, destPath);
});