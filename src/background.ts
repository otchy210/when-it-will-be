import { common } from './common';
import { getNow } from './message/messageHandlers/getNow';
import { MessageListener } from './message/MessageListener';
import { Json, Message } from './types';

console.log('background.ts');

common();

const messageListener = new MessageListener([getNow]);

chrome.runtime.onMessage.addListener((message: Message, sender: chrome.runtime.MessageSender, callback: (response?: Json) => void) => {
    messageListener.listen(message, sender, callback);
    return true;
});
