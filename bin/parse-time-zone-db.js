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
const timeZoneCsvFile = `${tmpDirPath}/time_zone.csv`;

const timeZoneJsonPath = './src/time-zone.json';
const zoneNameSet = new Set();
const zoneNameMap = {};
parse(fs.readFileSync(timeZoneCsvFile)).forEach(([zoneName, countryCode]) => {
    if (zoneNameSet.has(zoneName)) {
        return true;
    }
    zoneNameSet.add(zoneName);
    if (!zoneNameMap[countryCode]) {
        zoneNameMap[countryCode] = [];
    }
    zoneNameMap[countryCode].push(zoneName);
});
const timeZoneDB = parse(fs.readFileSync(countryCsvFile)).reduce((map, [countryCode, countryName]) => {
    if (!zoneNameMap[countryCode]) {
        return map;
    }
    map[countryCode] = [countryName, zoneNameMap[countryCode].sort()];
    return map;
}, {});
fs.writeFileSync(timeZoneJsonPath, JSON.stringify(timeZoneDB));

fs.rmdirSync(tmpDirPath, {recursive: true});
