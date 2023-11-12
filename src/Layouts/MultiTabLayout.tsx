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
        {tabPageList.map((Comp, idx) => {
          return (
            <div
              key={`tab_page_${idx}`}
              className={`tab_page ${idx === tabIdx}?'visible':''`}
            >
              {Comp}
            </div>
          );
        })}
      </div>
    </div>
  );
}
