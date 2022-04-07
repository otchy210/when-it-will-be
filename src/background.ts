import { addSelectedTimeZone } from './message/messageHandlers/addSelectedTimeZone';
import { bgNotifyCardLoaded } from './message/messageHandlers/bgNotifyCardLoaded';
import { getCountries } from './message/messageHandlers/getCountries';
import { getSelectedTimeZones } from './message/messageHandlers/getSelectedTimeZones';
import { removeSelectedTimeZone } from './message/messageHandlers/removeSelectedTimeZone';
import { restoreDefaultSelectedTimeZones } from './message/messageHandlers/restoreDefaultSelectedTimeZones';
import { MessageListener } from './message/MessageListener';
import { Json, Message } from './types';

const messageListener = new MessageListener([
    getCountries,
    getSelectedTimeZones,
    addSelectedTimeZone,
    removeSelectedTimeZone,
    restoreDefaultSelectedTimeZones,
    bgNotifyCardLoaded,
]);

chrome.runtime.onMessage.addListener((message: Message, _: chrome.runtime.MessageSender, callback: (response?: Json) => void) => {
    messageListener.listen(message, callback);
    return true;
});
