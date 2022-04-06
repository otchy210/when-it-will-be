import { MessageHandler } from '../../types';
import { useSyncStorage } from '../../utils/ExtensionStorage';

const DEFAULT_TIME_ZONE = ['Asia/Tokyo', 'Asia/Singapore'];

export const getSelectedTimeZone: MessageHandler = {
    action: 'getSelectedTimeZone',
    handle: () => {
        const syncStorage = useSyncStorage();
        return new Promise((resolve) => {
            syncStorage.getOne<string[]>('selectedTimeZone', DEFAULT_TIME_ZONE).then((selectedTimeZone) => {
                resolve(selectedTimeZone);
            });
        });
    },
};
