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

export type CountryDB = {
    [countryCode: string]: string;
};

export type TimeZoneDB = {
    [zoneName: string]: [abbreviation: string, timeStart: number, gmtOffset: number, dst: number];
};
