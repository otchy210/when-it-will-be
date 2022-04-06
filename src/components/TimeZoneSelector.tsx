import { useState } from 'react';
import { TimeZoneDB } from '../types';
import CancelButton from './CancelButton';
import DatalistInput from './DatalistInput';
import HorizontalStack from './HorizontalStack';
import Label from './Label';
import SubmitButton from './SubmitButton';
import VirticalStack from './VirticalStack';

type Props = {
    timeZoneDB: TimeZoneDB;
    onClickAdd: (timeZone: string) => void;
};

const TimeZoneSelector: React.FC<Props> = ({ timeZoneDB, onClickAdd }: Props) => {
    const [countryCode, setCountryCode] = useState<string>();
    const [countryName, setCountryName] = useState<string>();
    const [timeZone, setTimeZone] = useState<string>();

    const countrySelected = !!countryCode && !!countryName;
    const timeZoneSelected = !!timeZone;

    const onChangeCountryCode = (countryCode: string) => {
        if (!timeZoneDB[countryCode]) {
            return;
        }
        setCountryCode(countryCode);
        setCountryName(timeZoneDB[countryCode][0]);
    };

    const onChangeTimeZone = (timeZone: string) => {
        if (!timeZoneDB[countryCode][1].includes(timeZone)) {
            return;
        }
        setTimeZone(timeZone);
    };

    const onClickClear = () => {
        setCountryCode(undefined);
        setCountryName(undefined);
        setTimeZone(undefined);
    };
    return (
        <VirticalStack>
            {!countrySelected && (
                <>
                    <Label>Select country code</Label>
                    <DatalistInput
                        id="countryCode"
                        options={Object.entries(timeZoneDB).map(([code, [name]]) => [code, name])}
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
                    <DatalistInput id="timeZone" options={timeZoneDB[countryCode][1].map((tz) => [tz, tz])} onChange={onChangeTimeZone} focus={true} />
                </>
            )}
            {(countrySelected || timeZoneSelected) && (
                <>
                    <Label style={{ marginTop: '0.25rem' }}>Time zone</Label>
                    <div>{timeZone}</div>
                    <HorizontalStack style={{ marginTop: '0.25rem', justifyContent: 'flex-end' }}>
                        <CancelButton onClick={onClickClear}>Clear</CancelButton>
                        <SubmitButton disabled={!(countrySelected && timeZoneSelected)} onClick={() => onClickAdd(timeZone)}>
                            Add
                        </SubmitButton>
                    </HorizontalStack>
                </>
            )}
        </VirticalStack>
    );
};

export default TimeZoneSelector;
