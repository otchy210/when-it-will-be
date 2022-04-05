import { Json, Message, MessageHandler } from '../../types';
import { sendMessage } from '../../utils/Tabs';

export const proxyCurrentTab = (original: MessageHandler): MessageHandler => {
    const { action } = original;
    return {
        action,
        handle: (payload?: Json): Promise<Json> => {
            return new Promise((resolve) => {
                const message: Message = {
                    action,
                    payload,
                };
                sendMessage(message)
                    .then(resolve)
                    .catch((e) => console.error(e));
            });
        },
    };
};
