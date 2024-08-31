"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./calendar.scss";
import { DayModal } from "./dayModal/DayModal";
import { useAppDispatch, useAppSelector } from "@/app/redux/common/hooks";
import { Price } from "./price/Price";
import { fetchSupabaseData } from "@/utils/supabaseFunk";
import { SelectMonth } from "./selectMonth/SelectMonth";

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

  const dayInfo = useAppSelector((state) => state.calendar);

  const dispatch = useAppDispatch();

  // 各月の金額
  const [monthPrice, setMonthPrice] = useState(0)
  // 各年の金額
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    // 年と月が存在するデータのみをフィルタリング
    const currentMonthInfo = dayInfo.filter(info => info.year && info.month);
  
    // 現在の年と月に該当するデータをさらにフィルタリング
    const currentMonthPrice = currentMonthInfo.filter(info => info.year === year && info.month === month);
  
    // 現在の年と月に該当するデータの数に基づいて、月ごとの売上を計算し、`monthPrice`に設定
    setMonthPrice(
      currentMonthPrice.length * 2000
    );
  
    // 全体のデータに基づいて、合計売上を計算し、`totalPrice`に設定
    setTotalPrice(
      currentMonthInfo.length * 2000
    );
  }, [dayInfo, month]); 
  
  // モーダルの開閉
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInputContent, setModalInputContent] = useState("");

  useEffect(() => {
    // monthが変更されたときにfirstDayとendDayを更新
    setFirstDay(new Date(year, month - 1, 1).getDay());
    setEndDay(new Date(year, month, 0).getDate());
  }, [year, month]);

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

  // カレンダーをクリックしたら
  const handleClick = (
    year: number,
    month: number,
    day: number,
    contents: string
  ) => {
    setModalOpen(true);
    setDay(day);
  };

  const handlePrevMonth = useCallback(() => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }, [month, year]);

  const handleNextMonth = useCallback(() => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }, [month, year]);

  // データの取得
  useEffect(() => {
    dispatch(fetchSupabaseData());
  }, [dispatch]);


  return (
    <>
      <div className="calendar">
        <div className="year">{year}年</div>
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
                      `}
                    key={j}
                    onClick={() =>
                      handleClick(year, month, day, modalInputContent)
                    }
                  >
                    {day !== 0 ? day : ""}
                    <p className={`lessonContent lessonContent${day}`}>
                      {currentDayInfo?.contents}
                    </p>
                  </div>
                );
              })}
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
      <SelectMonth
        year={year}
        setYear={setYear}
        month={month}
        setMonth={setMonth}
      />
      </div>
      <Price
        year={year}
        month={month}
        day={day}
        monthPrice={monthPrice}
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
