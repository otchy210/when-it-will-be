import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useBackgroundApi } from '../message/BackgroundApi';
import { Countries } from '../types';
import GlobalStyle from './GlobalStyle';
import LinkButton from './LinkButton';
import Note from './Note';
import TimeZoneSelector from './TimeZoneSelector';
import Viewer from './Viewer';
import ViewerBox from './ViewerBox';
import ViewerLine from './ViewerLine';
import ViewerTime from './ViewerTime';
import VirticalStack from './VirticalStack';

const PageWrapper = styled.div`
    margin: 0.5rem;
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
            <PageWrapper>
                <VirticalStack>
                    <Viewer>
                        <ViewerTime label="Local time" time={now} />
                        <ViewerTime timeZone="UTC" time={now} />
                        {selectedTimeZones && (
                            <>
                                <ViewerLine />
                                {selectedTimeZones.map((timeZone) => {
                                    return <ViewerTime timeZone={timeZone} time={now} onClickLabel={() => onClickRemove(timeZone)} />;
                                })}
                                <ViewerBox>
                                    {selectedTimeZones.length > 0 ? (
                                        <Note>Click label to remove</Note>
                                    ) : (
                                        <VirticalStack>
                                            <LinkButton onClick={onClickRestore}>Restore default</LinkButton>
                                        </VirticalStack>
                                    )}
                                </ViewerBox>
                            </>
                        )}
                        {countries && (
                            <>
                                <ViewerLine />
                                <ViewerBox>
                                    <TimeZoneSelector countries={countries} onClickAdd={onClickAdd} />
                                </ViewerBox>
                            </>
                        )}
                    </Viewer>
                </VirticalStack>
            </PageWrapper>
        </>
    );
};

export default PopupPage;
