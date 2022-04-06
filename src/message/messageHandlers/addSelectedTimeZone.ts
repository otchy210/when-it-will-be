import { MessageHandler } from '../../types';
import { useSyncStorage } from '../../utils/SyncStorage';

export const addSelectedTimeZone: MessageHandler = {
    action: 'addSelectedTimeZone',
    handle: (payload: { timeZone: string }) => {
        const { timeZone } = payload;
        return useSyncStorage().addSelectedTimeZone(timeZone);
    },
};
