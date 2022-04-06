import React from 'react';
import GlobalStyle from './GlobalStyle';
import HorizontalLine from './HorizontalLine';
import TimeViewer from './TimeViewer';
import VirticalStack from './VirticalStack';

type Props = Record<string, never>;

const PopupPage: React.FC<Props> = () => {
    const now = Date.now();
    return (
        <>
            <GlobalStyle />
            <VirticalStack>
                <TimeViewer label="Local time" epochTime={now} />
                <HorizontalLine />
                <TimeViewer timeZone="Asia/Tokyo" epochTime={now} />
                <TimeViewer timeZone="America/New_York" epochTime={now} />
                <TimeViewer timeZone="America/Kentucky/Monticello" epochTime={now} />
                <TimeViewer timeZone="Africa/Tunis" epochTime={now} />
            </VirticalStack>
        </>
    );
};

export default PopupPage;
