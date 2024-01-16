import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useBackgroundApi } from '../message/BackgroundApi';
import { Countries } from '../types';
import GlobalStyle from './GlobalStyle';
import LinkButton from './LinkButton';
import Note from './Note';
import TimeZoneSelector from './TimeZoneSelector';
import ViewerBox from './ViewerBox';
import ViewerLine from './ViewerLine';
import ViewerTime from './ViewerTime';
import ViewerTimeSelector from './ViewerTimeSelector';
import VirticalStack from './VirticalStack';

type PageWrapperProps = {
    tableWidth: number;
};
const PageWrapper = styled.div<PageWrapperProps>`
    margin: 0.5rem;
    width: ${(props) => props.tableWidth}px;
`;

const Viewer = styled.table``;

type Props = Record<string, never>;

const PopupPage: React.FC<Props> = () => {
    const tableRef = useRef<HTMLTableElement>();
    const [tableWidth, setTableWidth] = useState<number>(0);
    const [time, setTime] = useState<number>(Date.now());
    const [countries, setCountries] = useState<Countries>();
    const [selectedTimeZones, setSelectedTimeZones] = useState<string[]>();
    const backgroundApi = useBackgroundApi();
    useEffect(() => {
        backgroundApi.getCountries().then(setCountries);
    }, [setCountries]);
    useEffect(() => {
        backgroundApi.getSelectedTimeZones().then(setSelectedTimeZones);
    }, [setSelectedTimeZones]);
    useEffect(() => {
        setTableWidth(tableRef.current.offsetWidth);
    }, [selectedTimeZones]);
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
            <PageWrapper tableWidth={tableWidth}>
                <VirticalStack>
                    <Viewer ref={tableRef}>
                        <ViewerTimeSelector time={time} onChangeTime={setTime} />
                        <ViewerTime timeZone="UTC" time={time} />
                        {selectedTimeZones && (
                            <>
                                <ViewerLine />
                                {selectedTimeZones.map((timeZone) => {
                                    return <ViewerTime timeZone={timeZone} time={time} onClickLabel={() => onClickRemove(timeZone)} />;
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
