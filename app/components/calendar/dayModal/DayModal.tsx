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
}) => { 

  const {dayInfo} = useAppSelector((state) => state.calendar)
  const dispatch = useAppDispatch();

  // 入力したら
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(getModalContent({
      month,
      day,
      content: e.target.value
    }))
  };

  // キャンセルボタンクリック
  const handleCancelBtnClick = () => {
    setModalOpen(false)
    dispatch(getModalContent({
      month,
      day,
      content: ''
    }))
  }
  
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
        value={dayInfo[month]?.[day] || ''}
        onChange={(e) => handleInput(e)}
        />
      </div>
      <div className="modalBtns">
        <div 
        className="decisionBtn"
        onClick={() => setModalOpen(false)
        }
        >はい</div>
        <div 
        className="cancelBtn"
        onClick={() => {
          handleCancelBtnClick()
        }}
        >いいえ</div>
      </div>
    </div>
    </>
)}
