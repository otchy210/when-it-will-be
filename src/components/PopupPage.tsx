import React from 'react';
import HorizontalLine from './HorizontalLine';
import TimeViewer from './TimeViewer';
import VirticalStack from './VirticalStack';

type Props = Record<string, never>;

const PopupPage: React.FC<Props> = () => {
    const now = Date.now();
    return (
        <VirticalStack>
            <TimeViewer label="Local time" epochTime={now} />
            <HorizontalLine />
        </VirticalStack>
    );
};

export default PopupPage;
