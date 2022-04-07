import { useCard } from '../../page/Card';
import { MessageHandler } from '../../types';

export const resizeCard: MessageHandler = {
    action: 'resizeCard',
    handle: (payload: { width: number; height: number }) => {
        const { width, height } = payload;
        useCard().size(width, height).show(0, 0);
        return Promise.resolve(true);
    },
};
