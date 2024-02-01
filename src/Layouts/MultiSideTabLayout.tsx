import { useState } from "react";
import "./MultiSideTabLayout.scss";

interface IProp {
  tabList: string[];
  tabPageList: React.ReactNode[];
}

export default function MultiSideTabLayout({ tabList, tabPageList }: IProp) {
  const [tabIdx, setTabidx] = useState(0);

  return (
    <div className="multi_sidetab_wrapper">
      <div className="sidetab_list">
        {tabList.map((v, i) => {
          return (
            <div
              key={v + i}
              className={i === tabIdx ? "selected_sidetab" : "sidetab"}
              onClick={() => setTabidx(i)}
            >
              {v}
            </div>
          );
        })}
      </div>
      <div className="sidetab_page_list">
        {tabPageList.map((v, i) => {
          return (
            <div
              className={`sidetab_page ${i === tabIdx ? "visible" : ""}`}
              key={`sidetab_page_${v}_${i}`}
            >
              {v}
            </div>
          );
        })}
      </div>
    </div>
  );
}
