import { Json, Message } from '../types';

export const getCurrentTab = (): Promise<chrome.tabs.Tab> => {
    return new Promise((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            resolve(tabs[0]);
        });
    });
};

export const sendMessage = async (message: Message): Promise<Json> => {
    const tab = await getCurrentTab();
    return new Promise((resolve) => {
        chrome.tabs.sendMessage(tab.id, message, (response) => {
            resolve(response);
        });
    });
};
