import "./FindDuoPage.scss";

export default function FindDuoPage() {
  // const [currentQueuType,setCurrentQueueType] = useState();
  // const [currentLane,setCurrentLane] = useState()
  const tableData = [
    {
      소환사: "소환사1",
      주포지션: "탑",
      찾는포지션: "미드",
      티어: "다이아몬드",
      승률: "60%",
      kda: "3.5",
      메모: "좋은 팀원 찾습니다.",
      등록일시: "2022-01-01",
    },
    {
      소환사: "소환사2",
      주포지션: "서포터",
      찾는포지션: "정글",
      티어: "플래티넘",
      승률: "55%",
      kda: "2.8",
      메모: "랭크 도우미 구합니다.",
      등록일시: "2022-01-02",
    },
    // 추가적인 데이터는 여기에 추가해주세요.
  ];

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
        <button className="create_duo_wrapper duo_comp_wrapper">
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
            {tableData.map((data, index) => (
              <tr key={index}>
                <td>{data.소환사}</td>
                <td>{data.주포지션}</td>
                <td>{data.찾는포지션}</td>
                <td>{data.티어}</td>
                <td>{data.승률}</td>
                <td>{data.kda}</td>
                <td>{data.메모}</td>
                <td>{data.등록일시}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
