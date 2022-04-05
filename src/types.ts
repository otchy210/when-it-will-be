type JsonPrimitive = string | number | boolean | null;

type JsonArray = JsonPrimitive[] | JsonArray[] | JsonObject[];

type JsonObject = {
    [key: string]: JsonPrimitive | JsonArray | JsonObject;
};

export type Json = JsonPrimitive | JsonArray | JsonObject;

export type Message = {
    action: string;
    payload?: Json;
};

export type MessageHandler = {
    action: string;
    handle: (tab: chrome.tabs.Tab, payload?: Json) => Promise<Json | undefined>;
};
