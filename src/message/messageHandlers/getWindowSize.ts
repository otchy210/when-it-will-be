import { MessageHandler } from '../../types';

export const getWindowSize: MessageHandler = {
    action: 'getWindowSize',
    handle: () => {
        return Promise.resolve({
            width: document.body.clientWidth,
            height: document.body.clientHeight,
        });
    },
};
