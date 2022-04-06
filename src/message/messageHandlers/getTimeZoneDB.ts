import { MessageHandler } from '../../types';

export const getTimeZoneDB: MessageHandler = {
    action: 'getTimeZoneDB',
    handle: () => {
        const url = chrome.runtime.getURL('time-zone.json');
        return new Promise((resolve) => {
            fetch(url).then((res) => {
                res.json().then(resolve);
            });
        });
    },
};
