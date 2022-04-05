import React, { useState } from 'react';
import { useBackgroundApi } from '../message/BackgroundApi';

type Props = Record<string, never>;

const PopupPage: React.FC<Props> = () => {
    const [now, setNow] = useState<number>();
    const backgroundApi = useBackgroundApi();
    const onClick = async () => {
        const now = await backgroundApi.getNow();
        setNow(now);
    };
    return (
        <>
            <div>
                <button onClick={onClick}>getNow</button>
            </div>
            <div>{now}</div>
        </>
    );
};

export default PopupPage;
