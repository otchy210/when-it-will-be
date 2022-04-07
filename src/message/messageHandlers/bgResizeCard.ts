import { Message, MessageHandler } from '../../types';
import { sendMessage } from '../../utils/Tabs';

export const bgResizeCard: MessageHandler = {
    action: 'bgResizeCard',
    handle: (payload: { width: number; height: number }) => {
        return new Promise((resolve) => {
            const message: Message = {
                action: 'resizeCard',
                payload,
            };
            sendMessage(message)
                .then(resolve)
                .catch((e) => console.error(e));
        });
    },
};
