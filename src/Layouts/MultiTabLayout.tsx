import { useState } from "react";
import "./MultiTabLayout.scss";
interface IProp {
  tabList: string[];
  tabPageList: React.ReactNode[];
}

export default function MultiTabLayout({ tabList, tabPageList }: IProp) {
  const [tabIdx, setTabidx] = useState(0);

  return (
    <div className="tab_list_wrapper">
      <div className="tab_list">
        {tabList.map((v, i) => {
          return (
            <div
              key={v + i}
              className={i === tabIdx ? "selected_tab" : "tab"}
              onClick={() => setTabidx(i)}
            >
              {v}
            </div>
          );
        })}
      </div>
      <div className="tab_page_list">
        {tabPageList.map((v, i) => {
          return (
            <div
              className={`tab_page ${i === tabIdx ? "visible" : ""}`}
              key={`tab_page_${v}_${i}`}
            >
              {v}
            </div>
          );
        })}
      </div>
    </div>
  );
}
