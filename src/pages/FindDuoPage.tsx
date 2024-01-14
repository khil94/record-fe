import { useEffect, useRef, useState } from "react";
import { GetDuoDetail, getDuoList } from "../api/apis";
import DuoDetailModal from "../components/DuoDetailModal";
import DuoModal from "../components/DuoModal";
import { IDuoObj } from "../types/types";
import "./FindDuoPage.scss";

export default function FindDuoPage() {
  // const [currentQueuType,setCurrentQueueType] = useState();
  // const [currentLane,setCurrentLane] = useState()
  const [showModal, setShowModal] = useState(false);
  const currentPage = useRef(1);
  const [duoListData, setDuoListData] = useState<IDuoObj[]>([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailData, setDetailData] = useState<IDuoObj>();

  useEffect(() => {
    const getData = async () => {
      const { data } = await getDuoList(currentPage.current);
      setDuoListData(data.duoList);
      console.log(data);
    };
    getData();
  }, []);

  async function getDetailData(duoid: number) {
    const resp = await GetDuoDetail(duoid);
    setDetailData(resp.data.duo);
  }
  console.log(detailData);

  return (
    <div className="duo_page_wrapper">
      <div className="duo_page_head_wrapper">
        {/* <div className="duo_comp_wrapper select_queue_type_wrapper">
          <div className=" select_queue_type">
            <span>솔로 랭크</span>
            <span>자유 랭크</span>
            <span>일반</span>
          </div>
        </div> */}
        {/* <div className="duo_comp_wrapper lane_wrapepr">
          <button>
            <img src="/Position_Top.png" />
          </button>
          <button>
            <img src="/Position_Jungle.png" />
          </button>
          <button>
            <img src="/Position_Mid.png" />
          </button>
          <button>
            <img src="/Position_Bot.png" />
          </button>
          <button>
            <img src="/Position_Support.png" />
          </button>
        </div> */}
        <button
          onClick={() => setShowModal(true)}
          className="create_duo_wrapper duo_comp_wrapper"
        >
          듀오찾기
        </button>
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
              <th>메모</th>
              <th>등록일시</th>
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
                <td>{v.gameName}</td>
                <td>
                  <img
                    src={`/Position_${v.line.toLowerCase()}.png`}
                    width={32}
                  />
                </td>
                <td>
                  {v.wishLines.map((t) => {
                    return (
                      <img
                        key={`wishlines_${t}`}
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
                <td>{v.createdAt.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DuoModal
        showModal={showModal}
        onDisapppear={() => setShowModal(false)}
      />
      {detailData && (
        <DuoDetailModal
          showModal={showDetailModal}
          onDisapppear={() => setShowDetailModal(false)}
          obj={detailData}
        />
      )}
    </div>
  );
}
