import React, { useEffect, useState } from 'react';
import { useBackgroundApi } from '../message/BackgroundApi';
import { Countries } from '../types';
import GlobalStyle from './GlobalStyle';
import HorizontalLine from './HorizontalLine';
import TimeViewer from './TimeViewer';
import TimeZoneSelector from './TimeZoneSelector';
import VirticalStack from './VirticalStack';

type Props = Record<string, never>;

const PopupPage: React.FC<Props> = () => {
    const [countries, setCountries] = useState<Countries>();
    const [selectedTimeZone, setSelectedTimeZone] = useState<string[]>();
    const now = Date.now();
    const backgroundApi = useBackgroundApi();
    useEffect(() => {
        backgroundApi.getCountries().then(setCountries);
    }, [setCountries]);
    useEffect(() => {
        backgroundApi.getSelectedTimeZone().then(setSelectedTimeZone);
    }, [setSelectedTimeZone]);
    return (
        <>
            <GlobalStyle />
            <VirticalStack>
                <TimeViewer label="Local time" epochTime={now} />
                {selectedTimeZone && (
                    <>
                        <HorizontalLine />
                        {selectedTimeZone.map((timeZone) => {
                            return <TimeViewer timeZone={timeZone} epochTime={now} />;
                        })}
                    </>
                )}
                {countries && (
                    <>
                        <HorizontalLine />
                        <TimeZoneSelector countries={countries} onClickAdd={(timeZone) => console.log(`${timeZone} is added!`)} />
                    </>
                )}
            </VirticalStack>
        </>
    );
};

export default PopupPage;
