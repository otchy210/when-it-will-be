import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useBackgroundApi } from '../message/BackgroundApi';
import GlobalStyle from './GlobalStyle';
import HorizontalLine from './HorizontalLine';
import TimeViewer from './TimeViewer';
import VirticalStack from './VirticalStack';

const CardWrapper = styled.div`
    margin: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.25rem;
    background-color: #fff;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
`;

type Props = Record<string, never>;

const CardPage: React.FC<Props> = () => {
    const [selectedTimeZones, setSelectedTimeZones] = useState<string[]>();
    const backgroundApi = useBackgroundApi();
    useEffect(() => {
        backgroundApi.getSelectedTimeZones().then(setSelectedTimeZones);
    }, [setSelectedTimeZones]);
    const url = new URL(location.href);
    const time = Number(url.searchParams.get('time'));

    return (
        <>
            <GlobalStyle />
            <CardWrapper>
                <VirticalStack>
                    <TimeViewer label="Local time" time={time} />
                    {selectedTimeZones?.length > 0 && (
                        <>
                            <HorizontalLine />
                            {selectedTimeZones.map((timeZone) => {
                                return <TimeViewer timeZone={timeZone} time={time} />;
                            })}
                        </>
                    )}
                </VirticalStack>
            </CardWrapper>
        </>
    );
};

export default CardPage;
