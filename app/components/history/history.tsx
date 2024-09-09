"use client";

import { useAppSelector } from "@/app/redux/common/hooks";
import { DayInfo } from "@/app/types/types";
import { useEffect, useState } from "react";
import "./history.scss";

export const LessonDay = ({
  year,
  month,
  sortDayInfo,
  historyShow,
  setHistoryShow,
}: {
  year: number;
  month: number;
  day: number;
  sortDayInfo: DayInfo[];
  historyShow: boolean;
  setHistoryShow: (historyShow: boolean) => void;
}) => {
  const dayInfo = useAppSelector((state) => state.calendar);

  const handleCloseHistory = () => {
    setHistoryShow(false);
  };


  // 先月
  let lastMonth = 0

  return (
    <>
      <div className={`history ${historyShow ? "isShow" : ""}`}>
        {/* <div className="historyMask"></div> */}
        <div className="historyWrap" onClick={handleCloseHistory}>
          <div className="closeHistoryBtn" onClick={handleCloseHistory}>
            ×
          </div>
          <div className="currentYear">{year}年</div>
          
          {
          sortDayInfo.map((info, index) => {
            // 月が変わった場合は true、変わっていない場合は false
            const showMonthHeader = info.month !== lastMonth
            // 最新の月に更
            lastMonth = info.month

              return (
                <div key={index}>
                  {showMonthHeader 
                  && 
                  <p className="monthTitle">{`${info.month}月のレッスン`}</p>}
                  <ul className={`historyList month${info.month}`} key={index}>
                    <li className="historyItemDate">
                      {info.month}/{info.day}
                    </li>
                    <li className="historyItemContents">{info.contents}</li>
                  </ul>
                </div>
              );
            
          })}
          <div className="total">合計 {dayInfo.length} 回</div>
        </div>
      </div>
    </>
  );
};
