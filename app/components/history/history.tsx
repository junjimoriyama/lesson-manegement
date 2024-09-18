"use client";

import { useAppSelector } from "@/app/redux/common/hooks";
import { DayInfo } from "@/app/types/types";
import { use, useEffect, useRef, useState } from "react";
import "./history.scss";
import { HistoryNextArrow, HistoryPrevArrow } from "@/public/svg/svg";

export const History = ({
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

  // // 前々月
  // const twoMonthAgoData = new Date(year, month - 3);
  // const twoMonthYear = twoMonthAgoData.getFullYear();
  // const twoMonth = twoMonthAgoData.getMonth() + 1;
  // // 前月
  // const prevMonthData = new Date(year, month - 2);
  // const prevMonthYear = prevMonthData.getFullYear();
  // const prevMonth = prevMonthData.getMonth() + 1;
  // // 前々月と前月、当月のデータ抽出
  // const currentDisplayData = sortDayInfo.filter((info) => {
  //   return (
  //     (info.year === twoMonthYear && info.month === twoMonth) ||
  //     (info.year === prevMonthYear && info.month === prevMonth) ||
  //     (info.year === year && info.month === month)
  //   );
  // });

  // // 3ヶ月分のデータをグループ化
  // const currentDisplayGroupedMonth = currentDisplayData.reduce<
  //   Record<string, DayInfo[]>
  // >((acc, current) => {
  //   const key = `${current.year}-${current.month}`;
  //   if (!acc[key]) {
  //     acc[key] = [];
  //   }
  //   acc[key].push(current);
  //   return acc;
  // }, {});

  // グループ化したデータを配列化
  // const historyDisplayMonth = Object.values(currentDisplayGroupedMonth);
  // 年月でグループ化
  const groupedDayInfo = sortDayInfo.reduce<Record<string, DayInfo[]>>(
    (acc, current) => {
      // グループ化するにはkeyを設定する必要がある
      const key = `${current.year}-${current.month}`;

      // accは累積値であり初期値は{}である。この中にDayInfo型のcurrentが入ってくる。
      // グループ化するにはkeyを設定する必要がある。keyはcurrentのデータで共通するもである必要がある。
      // acc[key]= []で空の配列を指定することで、acc[key]は{key:[]}ということを明示させる

      if (!acc[key]) {
        acc[key] = [];
      }
      // {key:[]}の[]の中にcurrentが入ってくる
      acc[key].push(current);
      return acc;
    },
    {}
  );

  useEffect(() => {
    
  }, [])
  
  const groupedDayInfoArray = Object.values(groupedDayInfo);
  const groupedDayInfoArrayCount = Object.keys(groupedDayInfo).length
  
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);

  useEffect(() => {
    setStartIndex(groupedDayInfoArrayCount - 1)
    setEndIndex(groupedDayInfoArrayCount) /* 4 */
  }, [historyShow])

  const HistoryPrevMonth = () => {
    if(startIndex > 0) {
      setStartIndex(prev => prev - 1)
      setEndIndex(prev => prev - 1)
    }
  }
  const HistoryNextMonth = () => {
    if(endIndex < groupedDayInfoArrayCount) {
      console.log(endIndex)
      setStartIndex(prev => prev + 1)
      setEndIndex(prev => prev + 1)
    }
  }



  return (
    <>
      <div className={`history ${historyShow ? "isShow" : ""}`}
      // onClick={handleCloseHistory}
      >
        <div className="historyWrap" >
          <div className="closeHistoryBtn" onClick={handleCloseHistory}>
            ×
          </div>
          {/* <div className="currentYear">{year}年</div> */}
          <div className="historyListWrap">
            {/* {historyDisplayMonth.map((month, index) => {
              return (
                <div className={`historyList `} key={index}>
                  {month.map((each) => {
                    const isHeadShowMonth = each.month !== lastDayRef.current;
                    lastDayRef.current = each.month;
                    return (
                      <div key={`${each.year}-${each.month}-${each.day}`}>
                        {isHeadShowMonth && (
                          <p className="monthTitle">{`${each.month}月のレッスン`}</p>
                        )}
                        <ul className="historyItems" key={`${each.year}-${each.month}-${each.day}`}>
                          <li className="historyItemsDay">{each.day}日</li>
                          <li className="historyItemsContents">
                            {each.contents}
                          </li>
                        </ul>
                      </div>
                    );
                  })}
                </div>
              );
            })} */}
            {groupedDayInfoArray
              .slice(startIndex, endIndex)
              .map((info, index) => {
                return (
                  <div
                    className={`historyList ${info[0].year}-${info[0].month}`} // 年と月を使ってクラス名を作成
                    key={index}
                  >
                    <p className="monthTitle">{`${info[0].month}月のレッスン`}</p>
                    {info.map((each, index) => {

                      return (
                        <div key={index}>
                          <ul className="historyItems" key={index}>
                            <li className="historyItemsDay">{each.day}日</li>
                            <li className="historyItemsContents">
                              {each.contents}
                            </li>
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
          {/* <div className="total">合計 {dayInfo.length} 回</div> */}
        </div>
        <div className="historyArrow">
          <HistoryPrevArrow
          HistoryPrevMonth={HistoryPrevMonth}
          />
          <HistoryNextArrow
          HistoryNextMonth={HistoryNextMonth}
          />
        </div>
      </div>
    </>
  );
};
// "use client";

// import { useAppSelector } from "@/app/redux/common/hooks";
// import { DayInfo } from "@/app/types/types";
// import { useEffect, useState } from "react";
// import "./history.scss";

// export const LessonDay = ({
//   year,
//   month,
//   sortDayInfo,
//   historyShow,
//   setHistoryShow,
// }: {
//   year: number;
//   month: number;
//   day: number;
//   sortDayInfo: DayInfo[];
//   historyShow: boolean;
//   setHistoryShow: (historyShow: boolean) => void;
// }) => {
//   const dayInfo = useAppSelector((state) => state.calendar);

//   const handleCloseHistory = () => {
//     setHistoryShow(false);
//   };

//   // 先月
//   let lastMonth = 0

//   return (
//     <>
//       <div className={`history ${historyShow ? "isShow" : ""}`}>
//         {/* <div className="historyMask"></div> */}
//         <div className="historyWrap" onClick={handleCloseHistory}>
//           <div className="closeHistoryBtn" onClick={handleCloseHistory}>
//             ×
//           </div>
//           <div className="currentYear">{year}年</div>

//           {
//           sortDayInfo.map((info, index) => {
//             // 月が変わった場合は true、変わっていない場合は false
//             const showMonthHeader = info.month !== lastMonth
//             // 最新の月に更
//             lastMonth = info.month

//               return (
//                 <div key={index}>
//                   {showMonthHeader
//                   &&
//                   <p className="monthTitle">{`${info.month}月のレッスン`}</p>}
//                   <ul className={`historyList month${info.month}`} key={index}>
//                     <li className="historyItemDate">
//                       {info.month}/{info.day}
//                     </li>
//                     <li className="historyItemContents">{info.contents}</li>
//                   </ul>
//                 </div>
//               );

//           })}
//           <div className="total">合計 {dayInfo.length} 回</div>
//         </div>
//       </div>
//     </>
//   );
// };
