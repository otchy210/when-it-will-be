import React, { useEffect, useState } from 'react';
import { useBackgroundApi } from '../message/BackgroundApi';
import { TimeZoneDB } from '../types';
import GlobalStyle from './GlobalStyle';
import HorizontalLine from './HorizontalLine';
import TimeViewer from './TimeViewer';
import TimeZoneSelector from './TimeZoneSelector';
import VirticalStack from './VirticalStack';

type Props = Record<string, never>;

const PopupPage: React.FC<Props> = () => {
    const [timeZoneDB, setTimeZoneDB] = useState<TimeZoneDB>();
    const [selectedTimeZone, setSelectedTimeZone] = useState<string[]>();
    const now = Date.now();
    const backgroundApi = useBackgroundApi();
    useEffect(() => {
        backgroundApi.getTimeZoneDB().then(setTimeZoneDB);
    }, [setTimeZoneDB]);
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
                {timeZoneDB && (
                    <>
                        <HorizontalLine />
                        <TimeZoneSelector timeZoneDB={timeZoneDB} onClickAdd={(timeZone) => console.log(`${timeZone} is added!`)} />
                    </>
                )}
            </VirticalStack>
        </>
    );
};

export default PopupPage;
