import { MessageHandler } from '../../types';

export const getNow: MessageHandler = {
    action: 'getNow',
    handle: () => {
        return Promise.resolve(Date.now());
    },
};
