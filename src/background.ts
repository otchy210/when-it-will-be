import { getNow } from './message/messageHandlers/getNow';
import { getWindowSize } from './message/messageHandlers/getWindowSize';
import { proxyCurrentTab } from './message/messageHandlers/proxyCurrentTab';
import { MessageListener } from './message/MessageListener';
import { Json, Message } from './types';

const messageListener = new MessageListener([getNow, proxyCurrentTab(getWindowSize)]);

chrome.runtime.onMessage.addListener((message: Message, _: chrome.runtime.MessageSender, callback: (response?: Json) => void) => {
    messageListener.listen(message, callback);
    return true;
});
