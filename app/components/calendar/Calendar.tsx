"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./calendar.scss";
import { DayModal } from "./dayModal/DayModal";
import { useAppDispatch, useAppSelector } from "@/app/redux/common/hooks";
import { Price } from "../../components/price/Price";
import { fetchSupabaseData } from "@/utils/supabaseFunk";
import { SelectMonth } from "./selectMonth/SelectMonth";
import { HistoryLogo, NextArrow, PrevArrow, PriceLogo } from "@/public/svg/svg";
import { LessonDay } from "../history/history";
import { DayInfo } from "@/app/types/types";

export const Calendar = () => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [day, setDay] = useState(0);
  const [firstDay, setFirstDay] = useState(new Date(year, month, 1).getDate());
  const [endDay, setEndDay] = useState(new Date(year, month + 1, 0).getDate());
  const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
  // 列
  const columns = 7;
  // 行
  let rows = Math.ceil(firstDay + endDay) / columns;

  const [weeks, setWeeks] = useState<number[][]>([]);

  // redux
  const dayInfo = useAppSelector((state) => state.calendar);
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

  const [sortDayInfo, setSortDayInfo] = useState<DayInfo[]>([]);
  const [historyShow, setHistoryShow] = useState(false);


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
    console.log(sortDayInfo)
  };

  useEffect(() => {
    const filteredCurrentMonthData = dayInfo.filter(
      (info) => info.year === year && info.month === month
    );

    const paidDaysInCurrentMonth = filteredCurrentMonthData.filter(
      (day) => day.isPaid === false
    );

    const allPaidDays = dayInfo.filter((day) => day.isPaid === false);

    setMonthPrice(paidDaysInCurrentMonth.length * 2000);

    setTotalPrice(allPaidDays.length * 2000);
  }, [dayInfo, month]);

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
    console.log(weeks)
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
      <div className="calendarHeader">
        <div className="date">
          <div className="year">{year}年</div>
          <div className="month">{month}月</div>
        </div>

        <HistoryLogo handleHistoryClick={handleHistoryClick} />
        <Price
          year={year}
          month={month}
          day={day}
          monthPrice={monthPrice}
          totalPrice={totalPrice}
        />

      </div>
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
                      ${currentDayInfo?.isPaid === true ? "isPaid" : ""}
                      `}
                    key={j}
                    onClick={() => handleCalendarClick(day)}
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
      {/* onClick={handlePrevMonth} */}
      <div className="monthChangeBtn">
        <PrevArrow handlePrevMonth={handlePrevMonth} />
        <NextArrow handleNextMonth={handleNextMonth} />
        <SelectMonth
          year={year}
          setYear={setYear}
          month={month}
          setMonth={setMonth}
        />
      </div>
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
      <LessonDay
        year={year}
        month={month}
        day={day}
        sortDayInfo={sortDayInfo}
        historyShow={historyShow}
        setHistoryShow={setHistoryShow}
        // day={day}
      />
    </>
  );
};
