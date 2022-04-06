import { MessageHandler } from '../../types';

export const getCountry: MessageHandler = {
    action: 'getCountry',
    handle: () => {
        const url = chrome.runtime.getURL('time-zones/country.json');
        return new Promise((resolve) => {
            fetch(url).then((res) => {
                res.json().then(resolve);
            });
        });
    },
};
