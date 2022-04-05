import { common } from './common';
// import { useCurrentTabApi } from './message/CurrentTabApi';
import { getNow } from './message/messageHandlers/getNow';
import { MessageListener } from './message/MessageListener';
import { Json, Message } from './types';

console.log('background.ts');

common();

const messageListener = new MessageListener([getNow]);

chrome.runtime.onMessage.addListener((message: Message, _: chrome.runtime.MessageSender, callback: (response?: Json) => void) => {
    messageListener.listen(message, callback);
    return true;
});

// setInterval(() => {
//     const currentTabApi = useCurrentTabApi();
//     currentTabApi.getWindowSize().then((size) => {
//         if (size) {
//             console.log(size);
//         }
//     });
// }, 1000);
