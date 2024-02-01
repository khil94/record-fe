export const MENU_LIST = [
  { url: "ranking", name: "랭킹" },
  { url: "duo", name: "듀오 찾기" },
] as const;

export const LINE_LIST = ["TOP", "JG", "MID", "AD", "SUP"] as const;

export const QUEUE_TYPE_LIST = [
  "RANKED_SOLO",
  "RANKED_TEAM",
  "UNKNOWN",
] as const;

export const DUO_MATCH_TYPE_LIST = ["ALL", "MATCHING", "MATCHED"] as const;

export const TIER_TYPE_LIST = [
  "CHALLENGER",
  "GRANDMASTER",
  "MASTER",
  "DIAMOND",
  "EMERALD",
  "PLATINUM",
  "GOLD",
  "SILVER",
  "BRONZE",
  "IRON",
  "UNRANKED",
] as const;

export const RANK_NUMBER_LIST = [
  "RANK_ONE",
  "RANK_TWO",
  "RANK_THREE",
  "RANK_FOUR",
  "UNRANKED",
] as const;

export const GAME_MODE_LIST = [
  "CLASSIC",
  "ODIN",
  "ARAM",
  "TUTORIAL",
  "URF",
  "DOOMBOTSTEEMO",
  "ONEFORALL",
  "ASCENSION",
  "FIRSTBLOOD",
  "KINGPORO",
  "SIEGE",
  "ASSASSINATE",
  "ARSR",
  "DARKSTAR",
  "STARGUARDIAN",
  "PROJECT",
  "GAMEMODEX",
  "ODYSSEY",
  "NEXUSBLITZ",
  "ULTBOOK",
] as const;

export const QUEUE_ID_LIST = [
  "CUSTOM_GAME",
  "URF_GAME",
  "DRAFT_GAME",
  "DYNAMIC_RANK_GAME",
  "SOLO_RANK_GAME",
  "QUICK_PLAY",
  "FLEX_RANK_GAME",
  "OTHER_GAME",
  "NORMAL_GAME",
] as const;

export const GAME_TYPE_LIST = [
  "CUSTOM_GAME",
  "TUTORIAL_GAME",
  "MATCHED_GAME",
] as const;

export const LEADERBOARD_QUEUE_TYPE_LIST = [
  "RANKED_SOLO_5x5",
  "RANKED_FLEX_SR",
  "RANKED_FLEX_TT",
] as const;

export const ERR_CODE = {
  1000: "USER_JOIN_FAIL",
  1001: "USER_LOGIN_FAIL",
  1002: "NEED_LOGIN",
  1003: "NEED_EMAIL_AUTHENTICATION",
  1004: "WRONG_EMAIL_AUTHENTICATION",
  1005: "TOKEN_EXPIRED",
  2000: "DUO_ALREADY_EXIST",
  2001: "DUO_EXPIRED",
  2002: "DUO_ALREADY_MATCHED",
  2003: "DUO_OWNER_TRY_TICKET",
  9000: "INPUT_ERROR",
} as const;
