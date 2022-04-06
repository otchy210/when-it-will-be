import { MessageHandler } from '../../types';
import { useSyncStorage } from '../../utils/SyncStorage';

export const getSelectedTimeZones: MessageHandler = {
    action: 'getSelectedTimeZones',
    handle: () => {
        return useSyncStorage().getSelectedTimeZones();
    },
};
