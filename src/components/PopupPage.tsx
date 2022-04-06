import * as moment from 'moment-timezone';
import React, { useEffect, useState } from 'react';
import { useBackgroundApi } from '../message/BackgroundApi';
import { CountryDB } from '../types';

type Props = Record<string, never>;

const PopupPage: React.FC<Props> = () => {
    const [countryDB, setCountryDB] = useState<CountryDB>();
    const [now, setNow] = useState<number>(Date.now());
    const backgroundApi = useBackgroundApi();
    useEffect(() => {
        backgroundApi.getCountry().then(setCountryDB);
    }, []);
    useEffect(() => {
        const iid = setInterval(() => {
            setNow(Date.now());
        }, 1000);
        return () => {
            clearInterval(iid);
        };
    }, []);
    return (
        <div>
            <div style={{ fontFamily: 'monospace', whiteSpace: 'nowrap' }}>Local time: {moment(now).format()}</div>
            <hr />
        </div>
    );
};

export default PopupPage;
