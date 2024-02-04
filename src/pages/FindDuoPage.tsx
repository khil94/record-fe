import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSWRConfig } from "swr";
import { GetDuoDetail, GetMyDuo, useDuoList } from "../api/apis";
import CommonModal from "../components/CommonModal";
import DuoDetailModal from "../components/DuoDetailModal";
import DuoModal from "../components/DuoModal";
import Loading from "../components/Loading";
import { IDuoMatchType, IDuoObj, IPostQueueId } from "../types/types";
import { getMMDDHHmm } from "../utils/generalFunctions";
import "./FindDuoPage.scss";

export default function FindDuoPage() {
  const [showModal, setShowModal] = useState(false);
  const currentPage = useRef(1);
  const [duoListData, setDuoListData] = useState<IDuoObj[]>([]);
  const [myDuoData, setMyDuoData] = useState<IDuoObj>();
  const [detailData, setDetailData] = useState<IDuoObj>();

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showMyModal, setShowMyModal] = useState(false);
  const [showErrModal, setShowErrModal] = useState(false);

  const [match, setMatch] = useState<IDuoMatchType>("ALL");
  const [queue, setQueue] = useState<IPostQueueId>("ALL");
  const [myDuoId, setMyDuoId] = useState(-1);

  const { data, isLoading,  } = useDuoList(
    currentPage.current,
    match,
    queue
  );
  const { mutate } = useSWRConfig();
  useEffect(() => {
    if (data) {
      setDuoListData(data.data.duoList);
      setMyDuoId(data.data.myDuo?.id || -1);
    }
  }, [data]);

  async function getDetailData(duoid: number) {
    const resp = await GetDuoDetail(duoid);
    setDetailData(resp.data.duo);
  }

  return (
    <div className="duo_page_wrapper">
      {isLoading ? (
        <Loading width={48} />
      ) : (
        <>
          <div className="duo_page_head_wrapper">
            <div className="duo_btn_header">
              <div className="duo_queuetype_dropbox">
                <div className="duo_title">매칭상태</div>
                <div className="duo_dropbox_wrapper ">
                  <select
                    value={match}
                    onChange={(e) => setMatch(e.target.value as IDuoMatchType)}
                  >
                    <option value={"ALL"}>모두</option>
                    <option value={"MATCHING"}>매칭중</option>
                    <option value={"MATCHED"}>매칭완료</option>
                  </select>
                </div>
              </div>
              <div className="duo_queuetype_dropbox">
                <div className="duo_title">큐 타입</div>

                <div className="duo_dropbox_wrapper ">
                  <select
                    value={queue}
                    onChange={(e) => setQueue(e.target.value as IPostQueueId)}
                  >
                    <option value={"ALL"}>모두</option>
                    <option value={"SOLO_RANK_GAME"}>솔로랭크</option>
                    <option value={"FLEX_RANK_GAME"}>자유랭크</option>
                    <option value={"QUICK_PLAY"}>일반</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="duo_func_btn_wrapper">
              <button
                onClick={async () => {
                  const { data } = await GetMyDuo();
                  if (data.myduo) {
                    setMyDuoData(data.myduo);
                    setShowMyModal(true);
                  } else {
                    setShowErrModal(true);
                  }
                }}
                className="create_duo_wrapper duo_comp_wrapper"
              >
                내 듀오찾기
              </button>

              <button
                onClick={() => setShowModal(true)}
                className="create_duo_wrapper duo_comp_wrapper"
              >
                듀오찾기
              </button>
            </div>
          </div>
          <div className="duo_page_list_wrapper">
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
                {duoListData? duoListData.map((v, i) => (
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
                      {v.lines.map((t, ) => {
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
                    <td>{getMMDDHHmm(new Date(v.createdAt))}</td>
                    <td>{getMMDDHHmm(new Date(v.expiredAt))}</td>
                    <td>{v.matched ? "매칭완료" : "매칭중"}</td>
                  </tr>
                )): <tr ><td className="duo_page_none" colSpan={9}>현재 등록된 듀오 찾기가 없습니다.</td></tr>}
              </tbody>
            </table>
          </div>
          <DuoModal
            showModal={showModal}
            onDisapppear={() => {
              setShowModal(false);
              mutate(["/duo", currentPage.current, match, queue]);
            }}
          />
          {detailData && (
            <DuoDetailModal
              showModal={showDetailModal}
              onDisapppear={() => {
                setShowDetailModal(false);
                setDetailData(undefined);
              }}
              obj={detailData}
              own={detailData.id === myDuoId}
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
          <CommonModal
            showModal={showErrModal}
            title="듀오찾기 없음"
            message="내 듀오찾기가 없습니다. 원하는 상대와 매칭할 수 있는 듀오찾기를 만들어 보세요!"
            onDisapppear={() => setShowErrModal(false)}
          />
        </>
      )}
    </div>
  );
}
