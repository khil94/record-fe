export const MENU_LIST = ["TIER", "RANKING", "INFO", "COMMUNITY"] as const;

export type IMenu = (typeof MENU_LIST)[number];
