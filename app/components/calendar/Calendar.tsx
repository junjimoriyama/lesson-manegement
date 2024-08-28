"use client";

import { useEffect, useRef, useState } from "react";
import "./calendar.scss";
import { DayModal } from "./dayModal/DayModal";
import { CalendarProps } from "../../types/types";
import { useAppDispatch, useAppSelector } from "@/app/redux/common/hooks";
import { toggleSelectedDay } from "@/app/redux/Slice";
import { Price } from "./price/Price";
import { fetchSupabaseData } from "@/utils/supabaseFunk";
import { noSSR } from "next/dynamic";
export const Calendar = () => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [day, setDay] = useState(0);
  const [firstDay, setFirstDay] = useState(new Date(year, month, 1).getDate());
  const [endDay, setEndDay] = useState(new Date(year, month + 1, 0).getDate());
  const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
  const columns = 7;
  let rows = Math.ceil(firstDay + endDay) / columns;

  const [weeks, setWeeks] = useState<number[][]>([]);

  const { dayInfo } = useAppSelector((state) => state.calendar);
  const dispatch = useAppDispatch();

  // 金額
  const [eachPrice, setEachPrice] = useState<{ [key: number]: number }>({});
  const [totalPrice, setTotalPrice] = useState(0);
  
  // 各月の金額
  useEffect(() => {
    if (dayInfo[month]) {
      setEachPrice((prev) => ({
        ...prev,
        [month]: Object.keys(dayInfo[month]).length * 2000,
      }));
    } else {
      setEachPrice((prev) => ({
        ...prev,
        [month]: 0,
      }));
    }
  }, [dayInfo, month]);

  useEffect(() => {
    const total = Object.values(eachPrice).reduce((sum, num) => sum + num, 0);
    setTotalPrice(total);
  }, [eachPrice]);


  // 全ての月の金額
  useEffect(() => {
    const allStudyDay = Object.values(dayInfo)
    .map(info => Object.keys(info).length)
    .reduce((sum, num) => {
      return sum + num
    }, 0)
  setTotalPrice(allStudyDay * 2000)
  }, [dayInfo, month, eachPrice]);
  

  // モーダルの開閉
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInputContent, setModalInputContent] = useState("");

  useEffect(() => {
    // monthが変更されたときにfirstDayとendDayを更新
    setFirstDay(new Date(year, month - 1, 1).getDay());
    setEndDay(new Date(year, month, 0).getDate());
  }, [month, year]);

  useEffect(() => {
    // 1週間分を全体の配列に追加
    let generatedWeeks = [];
    let dayCounter = 1;

    for (let i = 0; i < rows; i++) {
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

  const handleClick = (month: number, day: number) => {
    setModalOpen(true);
    dispatch(
      toggleSelectedDay({
        month,
        day,
      })
    );
    setDay(day);
  };

  const handlePrevMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  useEffect(() => {
    dispatch(fetchSupabaseData());
  }, []);

  return (
    <>
      <div className="calendar">
        <div className="month">{month}月</div>
        <div className="weekList">
          {dayOfWeek.map((day, index) => (
            <div className="dayList" key={index}>
              {day}
            </div>
          ))}
        </div>
        {weeks.map((week, i) => {
          return (
            <div className="week" key={i}>
              {week.map((day, j) => (
                <div
                  className={`day day${day !== 0 ? day : ""}
                  ${dayInfo[month]?.[day]?.length > 0 ? "selected" : ""}
                  `}
                  key={j}
                  onClick={() => handleClick(month, day)}
                >
                  {day !== 0 ? day : ""}
                  <p className={`lessonContent lessonContent${day}`}>
                    {`${dayInfo[month]?.[day] || ""}`}
                  </p>
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <div className="monthChangeBtn">
        <div className="prevBtn" onClick={handlePrevMonth}>
          前月へ
        </div>
        <div className="nextBtn" onClick={handleNextMonth}>
          次月へ
        </div>
      </div>
      <Price
        month={month}
        day={day}
        eachPrice={eachPrice}
        totalPrice={totalPrice}
      />
      <DayModal
        date={date}
        year={year}
        month={month}
        day={day}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalInputContent={modalInputContent}
        setModalInputContent={setModalInputContent}
      />
    </>
  );
};

// "use client";

// import { useEffect, useRef, useState } from "react";
// import "./calendar.scss";
// import { DayModal } from "./dayModal/DayModal";
// import {CalendarProps} from '../../types/types'
// import { useAppDispatch, useAppSelector } from "@/app/redux/common/hooks";
// export const Calendar = () => {

//   const date = new Date();
//   const [year, setYear] = useState(date.getFullYear());
//   const [month, setMonth] = useState(date.getMonth() + 1);
//   const [day, setDay] = useState(0);
//   const [firstDay, setFirstDay] = useState(new Date(year, month, 1).getDate());
//   const [endDay, setEndDay] = useState(new Date(year, month + 1, 0).getDate());
//   const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
//   const columns = 7;
//   let rows = Math.ceil(firstDay + endDay) / columns;

//   const [weeks, setWeeks] = useState<number[][]>([]);
//   const [selectedDays, setSelectedDays] = useState<{ [key: number]: number[] }>({});

//   const [price, setPrice] = useState<{[key: number]: number}>({[month]: 0});
//   const [totalPrice, setTotalPrice] = useState(0);

//   // モーダルの開閉
//   const [ modalOpen, setModalOpen] = useState(false)

//   const [ displayLessonContents, setDisplayLessonContents ] = useState<{[key: number]: {[key: number]: string}}>({})

//   const {dayInfo} = useAppSelector((state) => state.modal)

//   useEffect(() => {
//     // monthが変更されたときにfirstDayとendDayを更新
//     setFirstDay(new Date(year, month - 1, 1).getDay());
//     setEndDay(new Date(year, month, 0).getDate());
//   }, [month, year]);

//   useEffect(() => {
//     // 1週間分を全体の配列に追加
//     let generatedWeeks = [];
//     let dayCounter = 1;

//     for (let i = 0; i < rows; i++) {
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
//   }, [month, year, firstDay, endDay]);

//   useEffect(() => {
//     if (selectedDays[month]?.length > 0) {
//       setPrice(prev => ({
//         ...prev,
//         [month]: selectedDays[month]?.length * 2000
//       })
//       )
//     } else {
//       setPrice(prev => ({
//         ...prev,
//         [month]: 0 // 他の月の金額はそのまま保持し、この月のみ0にする
//       }));
//     }
//   }, [selectedDays]);

//   useEffect(() => {
//     let total =  Object.values(price).reduce((sum, num) => {
//       return sum + num
//     })
//     setTotalPrice(total)
//   }, [price]);

//   const handleClick = (month: number, day: number) => {
//     if (day !== 0) {
//       if (selectedDays[month]?.includes(day)) {
//         setSelectedDays((prev) => ({
//           ...prev,
//           [month]: [...prev[month].filter((d) => d !== day)],
//         }));
//         setDisplayLessonContents(prev => ({
//           ...prev,
//           [month]: {
//             ...prev[month],
//             [day]: ''
//           }
//         }))
//       } else {
//         setDay(day)
//         setModalOpen(true)
//         setSelectedDays((prev) => ({
//           ...prev,
//           [month]: [...(prev[month] || []), day],
//         }));
//       }
//     }
//   };

//   const handlePrevMonth = () => {
//     if (month === 1) {
//       setMonth(12);
//       setYear(year - 1);
//     } else {
//       setMonth(month - 1);
//     }
//   };

//   const handleNextMonth = () => {
//     if (month === 12) {
//       setMonth(1);
//       setYear(year + 1);
//     } else {
//       setMonth(month + 1);
//     }
//   };

//   return (
//     <>
//       <div className="calendar">
//         <div className="month">{month}月</div>
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
//               {week.map((day, j) => (
//                 <div
//                   className={`day day${day !== 0 ? day : ""}
//               ${selectedDays[month]?.includes(day) && dayInfo[month]?.[day]?.length > 0 ? "selected" : ""}
//               `}
//                   key={j}
//                   onClick={
//                     () => handleClick(month, day)
//                   }
//                 >
//                   {day !== 0 ? day : ""}
//                   <p className={`lessonContent${day}`}>
//                     {dayInfo[month]?.[day] || ''}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           );
//         })}
//       </div>
//       <div className="monthChangeBtn">
//         <div className="prevBtn" onClick={handlePrevMonth}>
//           前月へ
//         </div>
//         <div className="nextBtn" onClick={handleNextMonth}>
//           次月へ
//         </div>
//       </div>

//       <div className="price">{`${[month]}月`}:{price[month] > 0 ? price[month] : price[month] = 0}</div>
//       <div className="totalPrice">合計:{totalPrice}</div>
//       <DayModal
//       date={date}
//       year={year}
//       month={month}
//       day={day}
//       modalOpen={modalOpen}
//       setModalOpen={setModalOpen}
//       displayLessonContents={displayLessonContents}
//       />
//       </>
//   );
// };

// if(day !== 0) {
//   if(selectedDays[month]?.includes(day)) {
//     setSelectedDays(prev => ({
//       ...prev,
//       [month]: [...prev[month].filter(d => d !== day)]
//     }))
//   } else {
//     setSelectedDays(prev => ({
//       ...prev,
//       [month]: [...(prev[month] || []), day]
//     }))
//   }
// }

// const onReceiveContent = (content: string) => {
//   setDisplayLessonContents(prev => ({
//     ...prev,
//     [month]: {
//       ...prev[month],
//       [day]: content
//     }
//   }))
// }
