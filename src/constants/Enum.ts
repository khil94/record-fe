export const MENU_LIST = [
  { url: "ranking", name: "랭킹" },
  { url: "duo", name: "듀오 찾기" },
] as const;

export const QUEUE_TYPE_LIST = [
  "RANKED_SOLO",
  "RANKED_TEAM",
  "UNKNOWN",
] as const;

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
  "NORMAL_GAME",
  "FLEX_RANK_GAME",
  "OTHER_GAME",
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
