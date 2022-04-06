/*
 * Parse csv files downloaded from https://timezonedb.com/download
 */

const fs = require('fs');
const { execSync } = require('child_process');
const { parse } = require('csv-parse/sync');

const tmpDirPath = './tmp';
const zipFile = 'TimeZoneDB.csv.zip';
const srcZipPath = `./resource/${zipFile}`;
const destZipPath = `${tmpDirPath}/${zipFile}`;

fs.rmdirSync(tmpDirPath, {recursive: true});
fs.mkdirSync(tmpDirPath);
fs.copyFileSync(srcZipPath, destZipPath);
execSync(`unzip ${destZipPath} -d ${tmpDirPath}`);

const countryCsvFile = `${tmpDirPath}/country.csv`;
const countriesJsonFile = `./src/countries.json`;
const countriesJson = parse(fs.readFileSync(countryCsvFile)).reduce((map, [countryCode, countryName]) => {
    map[countryCode] = countryName;
    return map;
}, {});
fs.writeFileSync(countriesJsonFile, JSON.stringify(countriesJson));

fs.rmdirSync(tmpDirPath, {recursive: true});
