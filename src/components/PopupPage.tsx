import React, { useEffect, useState } from 'react';
import { useBackgroundApi } from '../message/BackgroundApi';
import { CountryDB } from '../types';

type Props = Record<string, never>;

const PopupPage: React.FC<Props> = () => {
    const [countryDB, setCountryDB] = useState<CountryDB>();
    const [windowSize, setWindoeSize] = useState<{ width: number; height: number }>();
    const backgroundApi = useBackgroundApi();
    useEffect(() => {
        backgroundApi.getCountry().then(setCountryDB);
    }, []);
    const onClickGetWindowSize = async () => {
        const windowSize = await backgroundApi.getWindowSize();
        setWindoeSize(windowSize);
    };
    return (
        <>
            <div>countryDB: {countryDB && JSON.stringify(countryDB)}</div>
            <div>
                <button onClick={onClickGetWindowSize}>getWindowSize</button>
            </div>
            <div>
                width: {windowSize && windowSize.width}, height: {windowSize && windowSize.height}
            </div>
        </>
    );
};

export default PopupPage;
