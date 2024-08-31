"use client";

import { ChangeEvent, useState } from 'react';
import './selectMonth.scss'
import { useAppSelector } from '@/app/redux/common/hooks';

import { dayChangeProps } from "../../../types/types";

export const SelectMonth = ({year, setYear, month, setMonth}: dayChangeProps) => {

const  dayInfo  = useAppSelector((state) => state.calendar);

// 現在の日付
const date = new Date()

// const [ selectedYear, setSelectedYear ] = useState(date.getFullYear())
// const [ selectedMonth, setSelectedMonth ] = useState(date.getMonth() + 1)

// 年を取得
const getCurrentYears = () => {
  const currentYear = date.getFullYear()
  return Array.from({length: 2}, (_, i) => {
    return currentYear - i
  })
}
// 月を取得
const getCurrentMonth = () => {
  const currentMonth = date.getMonth() + 1
  return Array.from({length: 12}, (_, i) => {
    return (currentMonth + i - 1) % 12 + 1
  })
}
// 年
const years = getCurrentYears()
// 月
const months = getCurrentMonth()

const handleSelectedYear = (e: ChangeEvent<HTMLSelectElement>) => {
  setYear(Number(e.target.value))
}

const handleSelectedMonth = (e: ChangeEvent<HTMLSelectElement>) => {
  setMonth(Number(e.target.value))
}


  return (
    <div className='selectMonth'>
      <select
      onChange={(e) => handleSelectedYear(e)} 
      >
      {years.map(year => {
        return <option
        key={year}
        >
        {year}</option>
      })}
      </select>
      <select
      onChange={(e) => handleSelectedMonth(e)}
      >
      {months.map(month => {
        return <option
        key={month}
        >{month}</option>
      })}
      </select>
      
    </div>
  )
}
