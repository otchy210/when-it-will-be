import { addSelectedTimeZone } from './message/messageHandlers/addSelectedTimeZone';
import { getCountries } from './message/messageHandlers/getCountries';
import { getSelectedTimeZones } from './message/messageHandlers/getSelectedTimeZones';
import { getWindowSize } from './message/messageHandlers/getWindowSize';
import { proxyCurrentTab } from './message/messageHandlers/proxyCurrentTab';
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
    proxyCurrentTab(getWindowSize),
]);

chrome.runtime.onMessage.addListener((message: Message, _: chrome.runtime.MessageSender, callback: (response?: Json) => void) => {
    messageListener.listen(message, callback);
    return true;
});
