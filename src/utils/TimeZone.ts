import moment, { MomentZone } from 'moment-timezone';

export const getTimeZones = (countryCode: string): MomentZone[] => {
    return moment.tz
        .zonesForCountry(countryCode, true)
        .sort((left, right) => {
            const { name: lZone, offset: lOffset } = left;
            const { name: rZone, offset: rOffset } = right;
            if (lOffset !== rOffset) {
                return lOffset - rOffset;
            }
            return lZone.localeCompare(rZone);
        })
        .map(({ name: zone }) => {
            return moment.tz.zone(zone);
        });
};

export const formatAbbrs = (tz: MomentZone): string => {
    const set = new Set<string>();
    const uniqueAbbrs = tz.abbrs.filter((abbr) => {
        if (set.has(abbr)) {
            return false;
        }
        set.add(abbr);
        return true;
    });
    return `(${uniqueAbbrs.join(' / ')})`;
};

export const formatLabel = (timeZone: string, time: number): string => {
    const tz = moment.tz.zone(timeZone);
    const tzLabel = tz.name.split('/').at(-1).replaceAll('_', ' ');
    const abbrLabel = tz.abbr(time);
    if (abbrLabel.startsWith('+') || abbrLabel.startsWith('-') || tzLabel === abbrLabel) {
        return tzLabel;
    }
    return `${tzLabel} (${abbrLabel})`;
};
