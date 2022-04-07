import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useBackgroundApi } from '../message/BackgroundApi';
import GlobalStyle from './GlobalStyle';
import Viewer from './Viewer';
import ViewerLine from './ViewerLine';
import ViewerTime from './ViewerTime';

const CardWrapper = styled.div`
    margin: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.25rem;
    background-color: #fff;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
    float: left;
`;

type Props = Record<string, never>;

const CardPage: React.FC<Props> = () => {
    const [selectedTimeZones, setSelectedTimeZones] = useState<string[]>();
    const wrapperRef = useRef<HTMLDivElement>();
    const backgroundApi = useBackgroundApi();

    useEffect(() => {
        backgroundApi.getSelectedTimeZones().then(setSelectedTimeZones);
    }, [setSelectedTimeZones]);
    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) {
            return;
        }
        const rect = wrapper.getBoundingClientRect();
        const styles = getComputedStyle(wrapper);
        const { marginLeft, marginRight, marginTop, marginBottom } = styles;
        const width = rect.width + Number(marginLeft.slice(0, -2)) + Number(marginRight.slice(0, -2));
        const height = rect.height + Number(marginTop.slice(0, -2)) + Number(marginBottom.slice(0, -2));
        backgroundApi.notifyCardLoaded(width, height);
    }, [selectedTimeZones]);

    const url = new URL(location.href);
    const time = Number(url.searchParams.get('time'));

    return (
        <>
            <GlobalStyle />
            <CardWrapper ref={wrapperRef}>
                <Viewer>
                    <ViewerTime label="Local time" time={time} />
                    <ViewerTime timeZone="UTC" time={time} />
                    {selectedTimeZones?.length > 0 && (
                        <>
                            <ViewerLine />
                            {selectedTimeZones.map((timeZone) => {
                                return <ViewerTime timeZone={timeZone} time={time} />;
                            })}
                        </>
                    )}
                </Viewer>
            </CardWrapper>
        </>
    );
};

export default CardPage;
