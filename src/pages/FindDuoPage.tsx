import { useRef, useState } from "react";
import { useDuoList } from "../api/apis";
import DuoModal from "../components/DuoModal";
import "./FindDuoPage.scss";

export default function FindDuoPage() {
  // const [currentQueuType,setCurrentQueueType] = useState();
  // const [currentLane,setCurrentLane] = useState()
  const [showModal, setShowModal] = useState(false);
  const currentPage = useRef(1);
  const { data, isLoading } = useDuoList(currentPage.current);

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
            {data?.data.duoList.map((v, i) => (
              <tr key={i}>
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
    </div>
  );
}
