import { notifyCardLoaded } from './message/messageHandlers/notifyCardLoaded';
import { MessageListener } from './message/MessageListener';
import { onMouseMove } from './page/onMouseMove';
import { Json, Message } from './types';

const messageListener = new MessageListener([notifyCardLoaded]);

chrome.runtime.onMessage.addListener((message: Message, _: chrome.runtime.MessageSender, callback: (response?: Json) => void) => {
    messageListener.listen(message, callback);
    return true;
});

document.body.addEventListener('mousemove', onMouseMove);
