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
    handle: (payload?: Json) => Promise<Json>;
};

export type Countries = {
    [countryCode: string]: string;
};

export type GetOffset = (time: number) => string;

export type TimeZoneIsh = [label: string, offset: string | GetOffset];
