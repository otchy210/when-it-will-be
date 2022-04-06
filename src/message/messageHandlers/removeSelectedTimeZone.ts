import { MessageHandler } from '../../types';
import { useSyncStorage } from '../../utils/SyncStorage';

export const removeSelectedTimeZone: MessageHandler = {
    action: 'removeSelectedTimeZone',
    handle: (payload: { timeZone: string }) => {
        const { timeZone } = payload;
        return useSyncStorage().removeSelectedTimeZone(timeZone);
    },
};
