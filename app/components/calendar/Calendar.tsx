"use client";

// supabase
import { fetchSupabaseData } from "@/utils/supabaseFunk";
// hooks
import { useCallback, useEffect, useState } from "react";
// redux
import { DayInfo } from "@/app/types/types";
import { useAppDispatch, useAppSelector } from "@/app/redux/common/hooks";
// component
import { DayModal } from "./dayModal/DayModal";
import { Price } from "../../components/price/Price";
import { SelectMonth } from "./selectMonth/SelectMonth";
import { History } from "../history/history";
import {
  AfterLesson,
  HistoryLogo,
  NextArrow,
  PrevArrow,
} from "@/public/svg/svg";
// style
import "./calendar.scss";



export const Calendar = () => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [day, setDay] = useState(date.getDate());
  const [firstDay, setFirstDay] = useState(0);
  const [endDay, setEndDay] = useState(0);
  const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"];

  // カレンダーの各週
  const [weeks, setWeeks] = useState<number[][]>([]);

  // redux
  const dayInfo = useAppSelector((state) => state.calendar);
  // 並び替えたstate
  const [sortDayInfo, setSortDayInfo] = useState<DayInfo[]>([]);
  const dispatch = useAppDispatch();

  // 各月の金額
  const [monthPrice, setMonthPrice] = useState(0);
  // 各年の金額
  const [totalPrice, setTotalPrice] = useState(0);

  // モーダルの開閉
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInputContent, setModalInputContent] = useState("");

  // 支払いチェックボックスの状態
  const [isPaid, setIsPaid] = useState(false);

  // カレンダー縦並び
  const [isVertical, setIsVertical] = useState(false);

  // レッスン履歴表示非表示
  const [historyShow, setHistoryShow] = useState(false);

  // データの取得
  useEffect(() => {
    dispatch(fetchSupabaseData());
  }, [dispatch]);

  // レッスン履歴クリック
  const handleHistoryClick = () => {
    // マスク表示
    setHistoryShow(true);
    // 日付順
    const sorted = [...dayInfo].sort((a, b) => {
      if (a.year !== b.year) {
        return a.year - b.year;
      } else if (a.month !== b.month) {
        return a.month - b.month;
      } else {
        return a.day - b.day;
      }
    });
    setSortDayInfo(sorted);
  };

  // 金額の計算
  useEffect(() => {
    const filteredCurrentMonthData = dayInfo.filter(
      (info) => info.year === year && info.month === month
    );
    const paidDaysInCurrentMonth = filteredCurrentMonthData.filter(
      (day) => day.isPaid === false
    );

    const allPaidDays = dayInfo.filter((day) => day.isPaid === false);

    // 月毎の金額
    setMonthPrice(paidDaysInCurrentMonth.length * 2000);
    // 合計の金額
    setTotalPrice(allPaidDays.length * 2000);
  }, [dayInfo, month]);

  useEffect(() => {
    // カレンダーがどこから始まり、終わるかを数字で表す
    // monthは例えば0は1月、1は2月のことになる
    setFirstDay(new Date(year, month - 1, 1).getDay());
    setEndDay(new Date(year, month, 0).getDate());
  }, [year, month]);

  // 縦のカレンダー(デバイスサイズがタブレット以下)
  const [v_weeks, setV_Weeks] = useState<number[][]>([]);

  const v_columns = 3;
  const v_rows = endDay;

  let v_dayCounter = 1;
  let v_generatedWeeks = [];

  useEffect(() => {
    for (let i = 0; i < v_rows; i++) {
      let days = [];
      for (let j = 0; j < v_columns; j++) {
        days.push(v_dayCounter);
        v_dayCounter++;
      }
      v_generatedWeeks.push(days);
    }
    setV_Weeks(v_generatedWeeks);
  }, [firstDay, endDay]);

  // weeksに日付、曜日、内容を入れる
  const [v_weekGroupDays, setV_WeekGroupDays] = useState<
    { v_day: number; v_dayWeek: string; v_content: string }[]
  >([]);
  useEffect(() => {
    // stateにしまう配列を定義
    const tempDate = [];
    for (let i = 0; i < v_weeks.length; i++) {
      // day
      let v_day = i + 1;
      // 1日から順番に曜日を取得
      let v_dayWeek = dayOfWeek[new Date(year, month - 1, v_day).getDay()];
      // 月の絞り込み
      const currentMonthData = dayInfo.filter(
        (info) => info.year === year && info.month === month
      );
      // 日にちの絞り込み
      const currentDayData = currentMonthData.find(
        (each) => each.day === v_day
      );
      // コンテンツの絞り込み
      const v_content = currentDayData?.contents ? currentDayData.contents : "";

      tempDate.push({ v_day, v_dayWeek, v_content });
    }
    setV_WeekGroupDays(tempDate);
  }, [v_weeks, dayInfo]);

  TODO: useEffect(() => {
    // days = [] が作成され、j が0から6まで7回ループされる（columns = 7）。ループ内で日付が days.push(dayCounter) によって days 配列に追加されていく（または 0 が追加）。1週間分の日付が days にすべて追加されると、generatedWeeks.push(days) で generatedWeeks に1週分として追加される。これが rows（必要な週数）分繰り返され、カレンダー全体が複数の週に分かれて generatedWeeks に保存される。
    // 列
    const columns = 7;
    // 行
    let rows = Math.ceil((firstDay + endDay) / columns);
    let generatedWeeks = [];
    let dayCounter = 1;

    for (let i = 0; i < rows; i++) {
      // 1週間分の7つの日付を保持する
      let days = [];
      for (let j = 0; j < columns; j++) {
        let cellIndex = i * columns + j;
        if (cellIndex >= firstDay && dayCounter <= endDay) {
          days.push(dayCounter);
          dayCounter++;
        } else {
          days.push(0);
        }
      }
      generatedWeeks.push(days);
    }
    setWeeks(generatedWeeks);
  }, [firstDay, endDay]);

  // カレンダーをクリックしたら
  const handleCalendarClick = (day: number) => {
    if (day !== 0) {
      // チェックを外す
      setIsPaid(false);
      setModalOpen(true);
      setDay(day);
    }
  };

  // 前に戻る矢印
  const handlePrevMonth = useCallback(() => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }, [month, year]);
  // 次に進む矢印
  const handleNextMonth = useCallback(() => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }, [month, year]);

  

  // デバイスの横幅によりカレンダーレイアウト変更
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsVertical(true);
      } else {
        setIsVertical(false);
      }
    };
    window.addEventListener("resize", handleResize);

    // 初回実行
    handleResize();

    // クリーンアップ
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="calendar">
        <div className="calendarHeader">
          <div className="calendarHeaderWrap">
            <div className="date">
              <div className="year">{year}年</div>
              <div className="month">{month}月</div>
            </div>
            {/* レッスン履歴 */}
            <HistoryLogo handleHistoryClick={handleHistoryClick} />
          </div>

          <Price
            year={year}
            month={month}
            day={day}
            monthPrice={monthPrice}
            totalPrice={totalPrice}
          />
        </div>

        {!isVertical && (
          <div className="weekList">
            {dayOfWeek.map((day, index) => (
              <div className="dayList" key={index}>
                {day}
              </div>
            ))}
          </div>
        )}
        {!isVertical &&
          weeks.map((week, i) => {
            return (
              <div className="week" key={i}>
                {week.map((day, j) => {
                  const currentDayInfo = dayInfo.find((info) => {
                    return (
                      info.year === year &&
                      info.month === month &&
                      info.day === day
                    );
                  });
                  return (
                    <div
                      className={`day day${day !== 0 ? day : ""}
                    ${currentDayInfo?.day === day ? "selected" : ""}
                    ${currentDayInfo?.isPaid === true ? "isPaid" : ""}
                    `}
                      key={j}
                      onClick={() => handleCalendarClick(day)}
                    >
                      <div className="dayHead">
                        {day !== 0 ? day : ""}
                        {currentDayInfo?.day === day ? <AfterLesson /> : ""}
                      </div>
                      <p className={`lessonContent lessonContent${day}`}>
                        {currentDayInfo?.contents}
                      </p>
                    </div>
                  );
                })}
              </div>
            );
          })}

        {isVertical &&
          v_weekGroupDays.map((group, index) => {
            const currentDayInfo = dayInfo.find((info) => {
              return (
                info.year === year &&
                info.month === month &&
                info.day === group.v_day
              );
            });

            return (
              <ul
                className={`v_dayList ${
                  group.v_day === currentDayInfo?.day ? "selected" : ""
                }`}
                key={index}
              >
                <li className={`v_day`}>{group.v_day}</li>
                <li
                  className={`v_dayWeek ${
                    group.v_dayWeek === "日"
                      ? "isRed"
                      : "" || group.v_dayWeek === "土"
                      ? "isBlue"
                      : ""
                  }`}
                >
                  {group.v_dayWeek}
                </li>
                <li
                  className="v_content"
                  onClick={() => handleCalendarClick(group.v_day)}
                >
                  {group.v_content}
                </li>
              </ul>
            );
          })}
        <div className="monthChange">
          <div className="prevNextMonth">
            <PrevArrow handlePrevMonth={handlePrevMonth} />
            <NextArrow handleNextMonth={handleNextMonth} />
          </div>
          <SelectMonth
            year={year}
            setYear={setYear}
            month={month}
            setMonth={setMonth}
          />
        </div>
      </div>
      {/* onClick={handlePrevMonth} */}
      <DayModal
        date={date}
        year={year}
        month={month}
        day={day}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalInputContent={modalInputContent}
        setModalInputContent={setModalInputContent}
        isPaid={isPaid}
        setIsPaid={setIsPaid}
      />
      <History
        year={year}
        month={month}
        day={day}
        sortDayInfo={sortDayInfo}
        historyShow={historyShow}
        setHistoryShow={setHistoryShow}
      />
    </>
  );
};

// TODO: 縦並びカレンダー
// import "./calendar.scss";
// import { DayModal } from "./dayModal/DayModal";
// import { useAppDispatch, useAppSelector } from "@/app/redux/common/hooks";
// import { Price } from "../../components/price/Price";
// import { fetchSupabaseData } from "@/utils/supabaseFunk";
// import { SelectMonth } from "./selectMonth/SelectMonth";
// import { HistoryLogo, NextArrow, PrevArrow, PriceLogo } from "@/public/svg/svg";
// import { History } from "../history/history";
// import { DayInfo } from "@/app/types/types";

// export const Calendar = () => {
//   const date = new Date();
//   const [year, setYear] = useState(date.getFullYear());
//   const [month, setMonth] = useState(date.getMonth() + 1);
//   const [day, setDay] = useState(0);
//   const [firstDay, setFirstDay] = useState(0);
//   const [endDay, setEndDay] = useState(0);
//   const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
//   // // 列
//   // const columns = 7;
//   // // 行
//   // let rows = Math.ceil((firstDay + endDay) / columns);

//   const [weeks, setWeeks] = useState<number[][]>([]);

//   // redux
//   const dayInfo = useAppSelector((state) => state.calendar);
//   const dispatch = useAppDispatch();

//   // 各月の金額
//   const [monthPrice, setMonthPrice] = useState(0);
//   // 各年の金額
//   const [totalPrice, setTotalPrice] = useState(0);

//   // モーダルの開閉
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalInputContent, setModalInputContent] = useState("");

//   // 支払いチェックボックスの状態
//   const [isPaid, setIsPaid] = useState(false);

//   const [sortDayInfo, setSortDayInfo] = useState<DayInfo[]>([]);
//   const [historyShow, setHistoryShow] = useState(false);

//    // データの取得
//    useEffect(() => {
//     dispatch(fetchSupabaseData());
//   }, [dispatch]);

//   const handleHistoryClick = () => {
//     // マスク表示
//     setHistoryShow(true);
//     // 日付順
//     const sorted = [...dayInfo].sort((a, b) => {
//       if (a.year !== b.year) {
//         return a.year - b.year;
//       } else if (a.month !== b.month) {
//         return a.month - b.month;
//       } else {
//         return a.day - b.day;
//       }
//     });
//     setSortDayInfo(sorted);
//   };

//   useEffect(() => {
//     const filteredCurrentMonthData = dayInfo.filter(
//       (info) => info.year === year && info.month === month
//     );

//     const paidDaysInCurrentMonth = filteredCurrentMonthData.filter(
//       (day) => day.isPaid === false
//     );

//     const allPaidDays = dayInfo.filter((day) => day.isPaid === false);

//     setMonthPrice(paidDaysInCurrentMonth.length * 2000);

//     setTotalPrice(allPaidDays.length * 2000);
//   }, [dayInfo, month]);

//   useEffect(() => {
//     // カレンダーがどこから始まり、終わるかを数字で表す
//     // monthは例えば0は1月、1は2月のことになる
//     setFirstDay(new Date(year, month - 1, 1).getDay());
//     setEndDay(new Date(year, month, 0).getDate());
//   }, [year, month]);

//   // 列
//   const columns = 3;
//   // 行
//   let rows = endDay;

//   useEffect(() => {
//     let dayCounter = 1;
//     let generatedWeeks = [];

//     for (let i = 0; i < rows; i++) {
//       let days = [];
//       for (let j = 0; j < columns; j++) {
//         days.push(dayCounter);
//         dayCounter++;
//       }
//       generatedWeeks.push(days);
//     }
//     setWeeks(generatedWeeks);
//   }, [firstDay, endDay]);

//   const [weekGroupDays, setWeekGroupDays] = useState<{day: number, weekDay: string, content: string}[]>([]);

//   useEffect(() => {
//     const weekGroupDaysArray: {day: number, weekDay: string, content: string}[]= [];

//     // 3列1組
//     for (let i = 0; i < weeks.length; i += 1) {
//       const day = i + 1; // 日付
//       const weekDayIndex = new Date(year, month - 1, day).getDay();
//       const weekDay = dayOfWeek[weekDayIndex];

//       // 当月分のデータのみ取得
//       const filterInfo = dayInfo.filter(
//         (info) => info.year === year && info.month === month
//       );
//       // 当月分のデータから1日分のデータを取得
//       const currentDayInfo = filterInfo.find(
//         (info) => info.year === year && info.month === month && info.day === day
//       );

//       // 該当の日付があればその内容を、なければ空文字をセット
//       const content = currentDayInfo?.contents ? currentDayInfo.contents : ''
//       // const content = currentDayInfo ? currentDayInfo.contents : "";

//       weekGroupDaysArray.push({day, weekDay, content: content});
//     }

//     setWeekGroupDays(weekGroupDaysArray); // 結果を状態に設定
//     // console.log(ObSekGroupDays)
//   }, [weeks]);

//   //TODO: useEffect(() => {
//   //   // days = [] が作成され、j が0から6まで7回ループされる（columns = 7）。ループ内で日付が days.push(dayCounter) によって days 配列に追加されていく（または 0 が追加）。1週間分の日付が days にすべて追加されると、generatedWeeks.push(days) で generatedWeeks に1週分として追加される。これが rows（必要な週数）分繰り返され、カレンダー全体が複数の週に分かれて generatedWeeks に保存される。
//   //   let generatedWeeks = [];
//   //   let dayCounter = 1;

//   //   for (let i = 0; i < rows; i++) {
//   //     // 1週間分の7つの日付を保持する
//   //     let days = [];
//   //     for (let j = 0; j < columns; j++) {
//   //       let cellIndex = i * columns + j;
//   //       if (cellIndex >= firstDay && dayCounter <= endDay) {
//   //         days.push(dayCounter);
//   //         dayCounter++;
//   //       } else {
//   //         days.push(0);
//   //       }
//   //     }
//   //     generatedWeeks.push(days);
//   //   }
//   //   setWeeks(generatedWeeks);
//   // }, [firstDay, endDay]);

//   // カレンダーをクリックしたら

//   const handleCalendarClick = (day: number) => {
//     if (day !== 0) {
//       // チェックを外す
//       setIsPaid(false);
//       setModalOpen(true);
//       setDay(day);
//     }
//   };

//   const handlePrevMonth = useCallback(() => {
//     if (month === 1) {
//       setMonth(12);
//       setYear(year - 1);
//     } else {
//       setMonth(month - 1);
//     }
//   }, [month, year]);

//   const handleNextMonth = useCallback(() => {
//     if (month === 12) {
//       setMonth(1);
//       setYear(year + 1);
//     } else {
//       setMonth(month + 1);
//     }
//   }, [month, year]);

//   return (
//     <>
//       <div className="calendar">
//         <div className="calendarHeader">
//           <div className="date">
//             <div className="year">{year}年</div>
//             <div className="month">{month}月</div>
//           </div>

//           <HistoryLogo handleHistoryClick={handleHistoryClick} />
//           <Price
//             year={year}
//             month={month}
//             day={day}
//             monthPrice={monthPrice}
//             totalPrice={totalPrice}
//           />
//         </div>
//         <div className="weekList">
//           {dayOfWeek.map((day, index) => (
//             <div className="dayList" key={index}>
//               {day}
//             </div>
//           ))}
//         </div>
//         {weekGroupDays.map((group, index) => (
//       <div key={index}>
//         <>
//         <p>{group.day}</p>
//         <p>{group.weekDay}</p>
//         <p>{group.content}</p>
//         </>

//       </div>
//     ))}
//         {/* {weeks.map((week, i) => {
//           return (
//             <div className="week" key={i}>
//               {week.map((day, j) => {
//                 const currentDayInfo = dayInfo.find((info) => {
//                   return (
//                     info.year === year &&
//                     info.month === month &&
//                     info.day === day
//                   );
//                 });
//                 return (
//                   <div
//                     className={`day day${day !== 0 ? day : ""}
//                       ${currentDayInfo?.day === day ? "selected" : ""}
//                       ${currentDayInfo?.isPaid === true ? "isPaid" : ""}
//                       `}
//                     key={j}
//                     onClick={() => handleCalendarClick(day)}
//                   >
//                     {day !== 0 ? day : ""}
//                     <p className={`lessonContent lessonContent${day}`}>
//                       {currentDayInfo?.contents}
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>
//           );
//         })} */}
//       </div>
//       {/* onClick={handlePrevMonth} */}
//       <div className="monthChangeBtn">
//         <PrevArrow handlePrevMonth={handlePrevMonth} />
//         <NextArrow handleNextMonth={handleNextMonth} />
//         <SelectMonth
//           year={year}
//           setYear={setYear}
//           month={month}
//           setMonth={setMonth}
//         />
//       </div>
//       <DayModal
//         date={date}
//         year={year}
//         month={month}
//         day={day}
//         modalOpen={modalOpen}
//         setModalOpen={setModalOpen}
//         modalInputContent={modalInputContent}
//         setModalInputContent={setModalInputContent}
//         isPaid={isPaid}
//         setIsPaid={setIsPaid}
//       />
//       <History
//         year={year}
//         month={month}
//         day={day}
//         sortDayInfo={sortDayInfo}
//         historyShow={historyShow}
//         setHistoryShow={setHistoryShow}
//         // day={day}
//       />
//     </>
//   );
// };

// TODO: 横並びカレンダー
// "use client";

// import { useCallback, useEffect, useRef, useState } from "react";
// import "./calendar.scss";
// import { DayModal } from "./dayModal/DayModal";
// import { useAppDispatch, useAppSelector } from "@/app/redux/common/hooks";
// import { Price } from "../../components/price/Price";
// import { fetchSupabaseData } from "@/utils/supabaseFunk";
// import { SelectMonth } from "./selectMonth/SelectMonth";
// import { HistoryLogo, NextArrow, PrevArrow, PriceLogo } from "@/public/svg/svg";
// import { LessonDay } from "../history/history";
// import { DayInfo } from "@/app/types/types";

// export const Calendar = () => {
//   const date = new Date();
//   const [year, setYear] = useState(date.getFullYear());
//   const [month, setMonth] = useState(date.getMonth() + 1);
//   const [day, setDay] = useState(0);
//   const [firstDay, setFirstDay] = useState(0);
//   const [endDay, setEndDay] = useState(0);
//   const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
//   // 列
//   const columns = 7;
//   // 行
//   let rows = Math.ceil((firstDay + endDay) / columns);

//   const [weeks, setWeeks] = useState<number[][]>([]);

//   // redux
//   const dayInfo = useAppSelector((state) => state.calendar);
//   const dispatch = useAppDispatch();

//   // 各月の金額
//   const [monthPrice, setMonthPrice] = useState(0);
//   // 各年の金額
//   const [totalPrice, setTotalPrice] = useState(0);

//   // モーダルの開閉
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalInputContent, setModalInputContent] = useState("");

//   // 支払いチェックボックスの状態
//   const [isPaid, setIsPaid] = useState(false);

//   const [sortDayInfo, setSortDayInfo] = useState<DayInfo[]>([]);
//   const [historyShow, setHistoryShow] = useState(false);

//   const handleHistoryClick = () => {
//     // マスク表示
//     setHistoryShow(true);
//     // 日付順
//     const sorted = [...dayInfo].sort((a, b) => {
//       if (a.year !== b.year) {
//         return a.year - b.year;
//       } else if (a.month !== b.month) {
//         return a.month - b.month;
//       } else {
//         return a.day - b.day;
//       }
//     });
//     setSortDayInfo(sorted);
//   };

//   useEffect(() => {
//     const filteredCurrentMonthData = dayInfo.filter(
//       (info) => info.year === year && info.month === month
//     );

//     const paidDaysInCurrentMonth = filteredCurrentMonthData.filter(
//       (day) => day.isPaid === false
//     );

//     const allPaidDays = dayInfo.filter((day) => day.isPaid === false);

//     setMonthPrice(paidDaysInCurrentMonth.length * 2000);

//     setTotalPrice(allPaidDays.length * 2000);
//   }, [dayInfo, month]);

//   useEffect(() => {
//     // カレンダーがどこから始まり、終わるかを数字で表す
//     // monthは例えば0は1月、1は2月のことになる
//     setFirstDay(new Date(year, month - 1, 1).getDay());
//     setEndDay(new Date(year, month, 0).getDate());
//   }, [year, month]);

//   useEffect(() => {
//     // days = [] が作成され、j が0から6まで7回ループされる（columns = 7）。ループ内で日付が days.push(dayCounter) によって days 配列に追加されていく（または 0 が追加）。1週間分の日付が days にすべて追加されると、generatedWeeks.push(days) で generatedWeeks に1週分として追加される。これが rows（必要な週数）分繰り返され、カレンダー全体が複数の週に分かれて generatedWeeks に保存される。
//     let generatedWeeks = [];
//     let dayCounter = 1;

//     for (let i = 0; i < rows; i++) {
//       // 1週間分の7つの日付を保持する
//       let days = [];
//       for (let j = 0; j < columns; j++) {
//         let cellIndex = i * columns + j;
//         if (cellIndex >= firstDay && dayCounter <= endDay) {
//           days.push(dayCounter);
//           dayCounter++;
//         } else {
//           days.push(0);
//         }
//       }
//       generatedWeeks.push(days);
//     }
//     setWeeks(generatedWeeks);
//   }, [firstDay, endDay]);

//   // カレンダーをクリックしたら
//   const handleCalendarClick = (day: number) => {
//     if (day !== 0) {
//       // チェックを外す
//       setIsPaid(false);
//       setModalOpen(true);
//       setDay(day);
//     }
//   };

//   const handlePrevMonth = useCallback(() => {
//     if (month === 1) {
//       setMonth(12);
//       setYear(year - 1);
//     } else {
//       setMonth(month - 1);
//     }
//   }, [month, year]);

//   const handleNextMonth = useCallback(() => {
//     if (month === 12) {
//       setMonth(1);
//       setYear(year + 1);
//     } else {
//       setMonth(month + 1);
//     }
//   }, [month, year]);

//   // データの取得
//   useEffect(() => {
//     dispatch(fetchSupabaseData());
//   }, [dispatch]);

//   return (
//     <>
//       <div className="calendar">
//         <div className="calendarHeader">
//           <div className="date">
//             <div className="year">{year}年</div>
//             <div className="month">{month}月</div>
//           </div>

//           <HistoryLogo handleHistoryClick={handleHistoryClick} />
//           <Price
//             year={year}
//             month={month}
//             day={day}
//             monthPrice={monthPrice}
//             totalPrice={totalPrice}
//           />
//         </div>
//         <div className="weekList">
//           {dayOfWeek.map((day, index) => (
//             <div className="dayList" key={index}>
//               {day}
//             </div>
//           ))}
//         </div>
//         {weeks.map((week, i) => {
//           return (
//             <div className="week" key={i}>
//               {week.map((day, j) => {
//                 const currentDayInfo = dayInfo.find((info) => {
//                   return (
//                     info.year === year &&
//                     info.month === month &&
//                     info.day === day
//                   );
//                 });
//                 return (
//                   <div
//                     className={`day day${day !== 0 ? day : ""}
//                       ${currentDayInfo?.day === day ? "selected" : ""}
//                       ${currentDayInfo?.isPaid === true ? "isPaid" : ""}
//                       `}
//                     key={j}
//                     onClick={() => handleCalendarClick(day)}
//                   >
//                     {day !== 0 ? day : ""}
//                     <p className={`lessonContent lessonContent${day}`}>
//                       {currentDayInfo?.contents}
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>
//           );
//         })}
//       </div>
//       {/* onClick={handlePrevMonth} */}
//       <div className="monthChangeBtn">
//         <PrevArrow handlePrevMonth={handlePrevMonth} />
//         <NextArrow handleNextMonth={handleNextMonth} />
//         <SelectMonth
//           year={year}
//           setYear={setYear}
//           month={month}
//           setMonth={setMonth}
//         />
//       </div>
//       <DayModal
//         date={date}
//         year={year}
//         month={month}
//         day={day}
//         modalOpen={modalOpen}
//         setModalOpen={setModalOpen}
//         modalInputContent={modalInputContent}
//         setModalInputContent={setModalInputContent}
//         isPaid={isPaid}
//         setIsPaid={setIsPaid}
//       />
//       <LessonDay
//         year={year}
//         month={month}
//         day={day}
//         sortDayInfo={sortDayInfo}
//         historyShow={historyShow}
//         setHistoryShow={setHistoryShow}
//         // day={day}
//       />
//     </>
//   );
// };
