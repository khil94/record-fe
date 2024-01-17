import { IQueueId, IRankNumber, ITierType } from "../types/types";

export function getTierName(tier: ITierType) {
  switch (tier) {
    case "BRONZE":
      return "브론즈";
    case "CHALLENGER":
      return "챌린저";
    case "DIAMOND":
      return "다이아몬드";
    case "EMERALD":
      return "에메랄드";
    case "GOLD":
      return "골드";
    case "GRANDMASTER":
      return "그랜드마스터";
    case "IRON":
      return "아이언";
    case "MASTER":
      return "마스터";
    case "PLATINUM":
      return "플래티넘";
    case "SILVER":
      return "실버";
    case "UNRANKED":
      return "UNRANKED";
  }
}

export function getRankName(rank: IRankNumber) {
  switch (rank) {
    case "RANK_FOUR":
      return 4;
    case "RANK_ONE":
      return 1;
    case "RANK_THREE":
      return 3;
    case "RANK_TWO":
      return 2;
    default:
      return "";
  }
}

export function getFullTierName(tier: ITierType, rank: IRankNumber) {
  const tierName = getTierName(tier);
  const rankName = getRankName(rank);

  switch (tierName) {
    case "챌린저":
    case "그랜드마스터":
    case "UNRANKED":
    case "마스터":
      return tierName;
    default:
      return `${tierName} ${rankName}`;
  }
}

export function getGameType(queueType: IQueueId) {
  switch (queueType) {
    case "CUSTOM_GAME":
      return "커스텀 게임";
    case "DRAFT_GAME":
      return "일반 교차 선택";
    case "QUICK_PLAY":
      return "일반 게임";
    case "URF_GAME":
      return "우르프 모드";
    case "SOLO_RANK_GAME":
      return "솔로 랭크";
    case "FLEX_RANK_GAME":
      return "자유 랭크";
    case "DYNAMIC_RANK_GAME":
    case "OTHER_GAME":
      return "기타";
  }
}

export function addRecentSearchVal(name: string, tag: string) {
  const temp = localStorage.getItem("recent");
  const tempVal = name + `#${tag}`;
  const ttemp = temp ? (JSON.parse(temp) as string[]) : [];
  const tttemp = ttemp.filter((v) => v !== tempVal);
  tttemp.unshift(tempVal);
  localStorage.setItem("recent", JSON.stringify(tttemp));
}

export function deleteRecentSearchVal(val: string) {
  const temp = localStorage.getItem("recent");
  const ttemp = temp ? (JSON.parse(temp) as string[]) : [];
  const tttemp = ttemp.filter((v) => v !== val);
  localStorage.setItem("recent", JSON.stringify(tttemp));
}

export function makeTagName(val: string) {
  const searchVal = val.trim();
  const [name, tag] = searchVal.split("#");
  return { name, tag: tag ? `${tag}` : "KR1" };
}

export function getXOR(a: boolean, b: boolean) {
  if (!a && b) {
    return true;
  }
  if (a && !b) {
    return true;
  }
  return false;
}
