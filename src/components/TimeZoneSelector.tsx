import { useEffect, useState } from 'react';
import { useBackgroundApi } from '../message/BackgroundApi';
import { CountryDB } from '../types';
import HorizontalStack from './HorizontalStack';

type Props = {
    dummy?: string;
};

const TimeZoneSelector: React.FC<Props> = ({ dummy }: Props) => {
    console.log(dummy);
    const [countryDB, setCountryDB] = useState<CountryDB>();
    const backgroundApi = useBackgroundApi();
    useEffect(() => {
        backgroundApi.getCountry().then((db) => {
            setCountryDB(db);
        });
    }, []);
    return (
        <HorizontalStack>
            <select>
                {countryDB &&
                    Object.entries(countryDB).map(([code, name]) => {
                        return <option value={code}>{name}</option>;
                    })}
            </select>
        </HorizontalStack>
    );
};

export default TimeZoneSelector;
