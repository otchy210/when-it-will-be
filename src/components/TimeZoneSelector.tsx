import { MomentZone } from 'moment-timezone';
import { useState } from 'react';
import { Countries } from '../types';
import { formatAbbrs, getTimeZones } from '../utils/TimeZone';
import CancelButton from './CancelButton';
import DatalistInput from './DatalistInput';
import HorizontalStack from './HorizontalStack';
import Label from './Label';
import SubmitButton from './SubmitButton';
import VirticalStack from './VirticalStack';

type Props = {
    countries: Countries;
    onClickAdd: (timeZone: string) => Promise<void>;
};

const TimeZoneSelector: React.FC<Props> = ({ countries, onClickAdd }: Props) => {
    const [countryCode, setCountryCode] = useState<string>();
    const [countryName, setCountryName] = useState<string>();
    const [timeZones, setTimeZones] = useState<MomentZone[]>();
    const [timeZone, setTimeZone] = useState<string>();

    const countrySelected = !!countryCode && !!countryName;
    const timeZoneSelected = !!timeZone;

    const onChangeCountryCode = (countryCode: string) => {
        if (!countries[countryCode]) {
            return;
        }
        setCountryCode(countryCode);
        setCountryName(countries[countryCode]);
        setTimeZones(getTimeZones(countryCode));
    };

    const onChangeTimeZone = (timeZone: string) => {
        const tz = timeZones
            .filter((tz) => {
                return tz.name === timeZone;
            })
            .at(0);
        if (!tz) {
            return;
        }
        setTimeZone(timeZone);
    };

    const onClickClear = () => {
        setCountryCode(undefined);
        setCountryName(undefined);
        setTimeZones(undefined);
        setTimeZone(undefined);
    };
    return (
        <VirticalStack>
            {!countrySelected && (
                <>
                    <Label>Select country code</Label>
                    <DatalistInput
                        id="countryCode"
                        options={Object.entries(countries).map(([code, name]) => [code, name])}
                        onChange={onChangeCountryCode}
                        focus={true}
                    />
                </>
            )}
            {countrySelected && (
                <>
                    <Label>Country</Label>
                    <div>{countryName}</div>
                </>
            )}
            {countrySelected && !timeZoneSelected && (
                <>
                    <Label style={{ marginTop: '0.25rem' }}>Select city representing time zone</Label>
                    <DatalistInput id="timeZone" options={timeZones.map((tz) => [tz.name, formatAbbrs(tz)])} onChange={onChangeTimeZone} focus={true} />
                </>
            )}
            {(countrySelected || timeZoneSelected) && (
                <>
                    <Label style={{ marginTop: '0.25rem' }}>Time zone</Label>
                    <div>{timeZone}</div>
                    <HorizontalStack style={{ marginTop: '0.25rem', justifyContent: 'flex-end' }}>
                        <CancelButton onClick={onClickClear}>Clear</CancelButton>
                        <SubmitButton
                            disabled={!(countrySelected && timeZoneSelected)}
                            onClick={() => {
                                onClickAdd(timeZone).then(() => {
                                    onClickClear();
                                });
                            }}
                        >
                            Add
                        </SubmitButton>
                    </HorizontalStack>
                </>
            )}
        </VirticalStack>
    );
};

export default TimeZoneSelector;
