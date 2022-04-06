import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useBackgroundApi } from '../message/BackgroundApi';
import { Countries } from '../types';
import GlobalStyle from './GlobalStyle';
import HorizontalLine from './HorizontalLine';
import LinkButton from './LinkButton';
import Note from './Note';
import TimeViewer from './TimeViewer';
import TimeZoneSelector from './TimeZoneSelector';
import VirticalStack from './VirticalStack';

const TimeViewerHolder = styled.div`
    cursor: pointer;
`;

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
    const onClickRemove = (timeZone: string) => {
        backgroundApi.removeSelectedTimeZone(timeZone).then(setSelectedTimeZones);
    };
    const onClickRestore = () => {
        backgroundApi.restoreDefaultSelectedTimeZones().then(setSelectedTimeZones);
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
                            return (
                                <TimeViewerHolder onClick={() => onClickRemove(timeZone)}>
                                    <TimeViewer timeZone={timeZone} time={now} />
                                </TimeViewerHolder>
                            );
                        })}
                        {selectedTimeZones.length > 0 ? <Note>Click to remove</Note> : <LinkButton onClick={onClickRestore}>Restore default</LinkButton>}
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
