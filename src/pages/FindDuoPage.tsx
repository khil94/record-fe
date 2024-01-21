import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GetDuoDetail, useDuoList } from "../api/apis";
import DuoDetailModal from "../components/DuoDetailModal";
import DuoModal from "../components/DuoModal";
import Loading from "../components/Loading";
import { IDuoMatchType, IDuoObj, IPostDuoQueueId } from "../types/types";
import { getMMDDHHmm } from "../utils/generalFunctions";
import "./FindDuoPage.scss";

export default function FindDuoPage() {
  const [showModal, setShowModal] = useState(false);
  const currentPage = useRef(1);
  const [duoListData, setDuoListData] = useState<IDuoObj[]>([]);
  const [myDuoData, setMyDuoData] = useState<IDuoObj>();
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showMyModal, setShowMyModal] = useState(false);
  const [detailData, setDetailData] = useState<IDuoObj>();
  const [match, setMatch] = useState<IDuoMatchType>("ALL");
  const [queue, setQueue] = useState<IPostDuoQueueId>("ALL");

  const { data, isLoading } = useDuoList(currentPage.current, match, queue);

  useEffect(() => {
    if (data) {
      setDuoListData(data.data.duoList);
      setMyDuoData(data.data.myDuo);
    }
  }, [data]);

  async function getDetailData(duoid: number) {
    const resp = await GetDuoDetail(duoid);
    setDetailData(resp.data.duo);
  }

  return (
    <div className="duo_page_wrapper">
      <>
        <div className="duo_page_head_wrapper">
          <div
            onClick={(e) => {
              e.preventDefault();
              setMatch(e.target.value);
            }}
            className=" duo_comp_wrapper"
          >
            <button value={"ALL"}>모두</button>
            <button value={"MATCHING"}>매칭중</button>
            <button value={"MATCHED"}>매칭완료</button>
          </div>
          <div
            onClick={(e) => {
              e.preventDefault();
              setQueue(e.target.value);
            }}
            className=" duo_comp_wrapper"
          >
            <button value={"ALL"}>모두</button>
            <button value={"SOLO_RANK_GAME"}>솔로랭크</button>
            <button value={"FLEX_RANK_GAME"}>자유랭크</button>
            <button value={"QUICK_PLAY"}>일반</button>
          </div>
          <div>
            <button
              onClick={() => setShowModal(true)}
              className="create_duo_wrapper duo_comp_wrapper"
            >
              듀오찾기
            </button>
            {myDuoData && (
              <button
                onClick={() => {
                  setShowMyModal(true);
                }}
                className="create_duo_wrapper duo_comp_wrapper"
              >
                내 듀오찾기
              </button>
            )}
          </div>
        </div>
        <div className="duo_page_list_wrapper">
          {isLoading ? (
            <Loading width={48} />
          ) : (
            <table className="duo_table">
              <thead>
                <tr>
                  <th>소환사</th>
                  <th>주 포지션</th>
                  <th>찾는 포지션</th>
                  <th>티어</th>
                  <th>승률</th>
                  <th>KDA</th>
                  <th>등록일자</th>
                  <th>만료일자</th>
                  <th>매칭여부</th>
                </tr>
              </thead>
              <tbody>
                {duoListData.map((v, i) => (
                  <tr
                    onClick={() => {
                      getDetailData(v.id);
                      setShowDetailModal(true);
                    }}
                    key={i}
                  >
                    <td>
                      <Link to={`/summoner/${v.gameName}/${v.tagLine}`}>
                        {v.gameName}
                      </Link>
                    </td>
                    <td>
                      {v.lines.map((t, i) => {
                        return (
                          <img
                            key={`wishlines_${v.id}_${t}`}
                            src={`/Position_${t.toLowerCase()}.png`}
                            width={32}
                          />
                        );
                      })}
                    </td>
                    <td>
                      {v.wishLines.map((t) => {
                        return (
                          <img
                            key={`wishlines_${v.id}_${t}`}
                            src={`/Position_${t.toLowerCase()}.png`}
                            width={32}
                          />
                        );
                      })}
                    </td>
                    <td>
                      <img src={`/${v.tier.toLowerCase()}.webp`} width={32} />
                    </td>
                    <td>{"dd"}</td>
                    <td>{"kda"}</td>
                    {/* <td>{v.ti}</td> */}
                    <td>{getMMDDHHmm(new Date(v.createdAt))}</td>
                    <td>{getMMDDHHmm(new Date(v.expiredAt))}</td>
                    <td>{v.matched ? "매칭완료" : "매칭중"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <DuoModal
          showModal={showModal}
          onDisapppear={() => setShowModal(false)}
        />
        {detailData && (
          <DuoDetailModal
            showModal={showDetailModal}
            onDisapppear={() => {
              setShowDetailModal(false);
              setDetailData(undefined);
            }}
            obj={detailData}
          />
        )}
        {myDuoData && (
          <DuoDetailModal
            showModal={showMyModal}
            onDisapppear={() => {
              setShowMyModal(false);
            }}
            obj={myDuoData}
            own={true}
          />
        )}
      </>
    </div>
  );
}
