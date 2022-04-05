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

const timeZoneDirPath = './src/time-zones';
fs.rmdirSync(timeZoneDirPath, {recursive: true});
fs.mkdirSync(timeZoneDirPath);

const countries = parse(fs.readFileSync(countryCsvFile)).reduce((map, [countryCode, countryName]) => {
    map[countryCode] = countryName;
    return map;
}, {});

const countriesPath = `${timeZoneDirPath}/country.json`;
fs.writeFileSync(countriesPath, JSON.stringify(countries));

const records = {};
parse(fs.readFileSync(timeZoneCsvFile)).forEach(([zoneName, countryCode, abbreviation, timeStart, gmtOffset, dst]) => {
    if (!records[countryCode]) {
        records[countryCode] = {};
    }
    if (!records[countryCode][zoneName]) {
        records[countryCode][zoneName] = [];
    }
    const data = [
        abbreviation,
        Number(timeStart),
        Number(gmtOffset),
        Number(dst)
    ];
    records[countryCode][zoneName].push(data);
});

Object.entries(records).forEach(([countryCode, timeZoneDb]) => {
    const timeZoneDbPath = `${timeZoneDirPath}/${countryCode}.json`;
    fs.writeFileSync(timeZoneDbPath, JSON.stringify(timeZoneDb));
});

fs.rmdirSync(tmpDirPath, {recursive: true});
