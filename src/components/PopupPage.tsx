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
    const [selectedTimeZones, setSelectedTimeZones] = useState<string[]>();
    const now = Date.now();
    const backgroundApi = useBackgroundApi();
    useEffect(() => {
        backgroundApi.getCountries().then(setCountries);
    }, [setCountries]);
    useEffect(() => {
        backgroundApi.getSelectedTimeZones().then(setSelectedTimeZones);
    }, [setSelectedTimeZones]);
    const onClickAdd = async (timeZone: string) => {
        backgroundApi.addSelectedTimeZone(timeZone).then(setSelectedTimeZones);
    };
    return (
        <>
            <GlobalStyle />
            <VirticalStack>
                <TimeViewer label="Local time" time={now} />
                {selectedTimeZones && (
                    <>
                        <HorizontalLine />
                        {selectedTimeZones.map((timeZone) => {
                            return <TimeViewer timeZone={timeZone} time={now} />;
                        })}
                    </>
                )}
                {countries && (
                    <>
                        <HorizontalLine />
                        <TimeZoneSelector countries={countries} onClickAdd={onClickAdd} />
                    </>
                )}
            </VirticalStack>
        </>
    );
};

export default PopupPage;
