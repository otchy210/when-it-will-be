import { MessageHandler } from '../../types';
import { useSyncStorage } from '../../utils/SyncStorage';

export const restoreDefaultSelectedTimeZones: MessageHandler = {
    action: 'restoreDefaultSelectedTimeZones',
    handle: () => {
        return useSyncStorage().restoreDefaultSelectedTimeZones();
    },
};
