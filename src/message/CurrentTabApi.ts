import { Json, Message } from '../types';
import { sendMessage } from '../utils/Tabs';

class CurrentTabApi {
    private send(action: string, payload?: Json): Promise<Json> {
        const message: Message = {
            action,
            payload,
        };
        return new Promise((resolve) => {
            sendMessage(message)
                .then(resolve)
                .catch((e) => console.error(e));
        });
    }

    getWindowSize(): Promise<{ width: number; height: number }> {
        return this.send('getWindowSize') as Promise<{ width: number; height: number }>;
    }
}

const instance = new CurrentTabApi();

export const useCurrentTabApi = () => instance;
