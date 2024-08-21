'use client'

import React, { ChangeEvent, useEffect, useState } from 'react'
import {CalendarProps} from '../../../types/types'

import './dayModal.scss'
import { useAppDispatch, useAppSelector } from '@/app/redux/common/hooks'
import {getModalContent} from "@/app/redux/Slice"

export const DayModal: React.FC<CalendarProps> = ({
  date, 
  year, 
  month,
  day,
  modalOpen,
  setModalOpen,
  onReceiveContent,
  displayLessonContents
}) => {

  const {dayInfo} = useAppSelector((state) => state.modal)
  const dispatch = useAppDispatch();

  // const [ lessonContent, setLessonContent ] = useState<{[key: number]: {[key: number]: string}}>({})


  const handleSave = () => {
    // onReceiveContent(lessonContent)
    setModalOpen(false)
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(getModalContent({
      month,
      day,
      content: e.target.value
    }))
    // dispatch(getModalContent(e.target.value))
    // setLessonContent(e.target.value);
  };
  // const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
  //   setLessonContent(e.target.value);
  //   // setLessonContent(prev => ({
  //   //   ...prev,
  //   //   [month]: {
  //   //     ...(prev[month] || {}),
  //   //     [day]: e.target.value
  //   //   }
  //   // }));
  // };
  

  return (
    <>
    <div className={`mask ${modalOpen ? 'isOpen' : ''}`}></div>
    <div className={`modal ${modalOpen ? 'isOpen' : ''}`}>
      <div className='modalTitle'>
        {year}年{month}月{day}日
      </div>
      <div className="modalContents">
        <input 
        className="modalInput" 
        type="text"
        // value={lessonContent[month]?.[day] || ''}
        onChange={(e) => handleInput(e)}
        />
      </div>
      <div className="modalBtns">
        <div 
        className="decisionBtn"
        onClick={
          handleSave
        }
        >はい</div>
        <div 
        className="cancelBtn"
        onClick={() => {
          setModalOpen(false)
        }}
        >いいえ</div>
      </div>
    </div>
    </>
)}
