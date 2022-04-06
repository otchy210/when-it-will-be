import { MessageHandler } from '../../types';

export const getCountries: MessageHandler = {
    action: 'getCountries',
    handle: () => {
        const url = chrome.runtime.getURL('countries.json');
        return new Promise((resolve) => {
            fetch(url).then((res) => {
                res.json().then(resolve);
            });
        });
    },
};
