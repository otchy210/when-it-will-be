import React, { useState } from 'react';
import { useBackgroundApi } from '../message/BackgroundApi';

type Props = Record<string, never>;

const PopupPage: React.FC<Props> = () => {
    const [now, setNow] = useState<number>();
    const [windowSize, setWindoeSize] = useState<{ width: number; height: number }>();
    const backgroundApi = useBackgroundApi();
    const onClickGetNow = async () => {
        const now = await backgroundApi.getNow();
        setNow(now);
    };
    const onClickGetWindowSize = async () => {
        const windowSize = await backgroundApi.getWindowSize();
        setWindoeSize(windowSize);
    };
    return (
        <>
            <div>
                <button onClick={onClickGetNow}>getNow</button>
            </div>
            <div>now: {now}</div>
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
