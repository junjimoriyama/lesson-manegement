"use client";

import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { CalendarProps } from "../../../types/types";

import { useAppDispatch, useAppSelector } from "@/app/redux/common/hooks";
import { getDayContent, toggleSelectedDay, deleteDay } from "@/app/redux/Slice";

import "./dayModal.scss";
import { addSupabaseData, updateSupabaseData, deleteSupabaseData } from "@/utils/supabaseFunk";

export const DayModal: React.FC<CalendarProps> = ({
  year,
  month,
  day,
  modalOpen,
  setModalOpen,
  modalInputContent,
  setModalInputContent,
}) => {
  
  const { dayInfo } = useAppSelector((state) => state.calendar);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (modalOpen) {
      setModalInputContent(dayInfo[month][day] || "");
    }
  }, [modalOpen]);


  const handleInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setModalInputContent(e.target.value);
  }, [setModalInputContent])


  const handleDecisionBtnClick = () => {
    dispatch(
      getDayContent({
        month,
        day,
        content: modalInputContent,
      })
    );
    setModalOpen(false);
  };

  const handleAddDayData = () => {
    if(!dayInfo[month][day]) {
      dispatch(addSupabaseData({
        addDayData: {
          [month]: {
            [day]: modalInputContent,
          },
        },
      }))
    } else {
      dispatch(updateSupabaseData({
        updateDayData: {
          [month]: {
            [day]: modalInputContent
          }
        }
      }))
    }
  };
  
  const handleDeleteBtnClick = () => {
    dispatch(
      deleteDay({
        month,
        day,
      })
    )
    dispatch(deleteSupabaseData({
      deleteDayData: {
        [month]: {
          [day]: modalInputContent,
        },
      }
    })
    )
    setModalOpen(false);
  }

  // キャンセルボタンクリック
  const handleCancelBtnClick = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className={`mask ${modalOpen ? "isOpen" : ""}`}></div>
      <div className={`modal ${modalOpen ? "isOpen" : ""}`}>
        <div className="modalTitle">
          {year}年{month}月{day}日
        </div>
        <div className="modalContents">
          {/* <p className='modalLabel'>内容</p> */}
          <input
            className="modalInput"
            type="text"
            value={modalInputContent || ""}
            onChange={(e) => handleInput(e)}
            placeholder="内容"
          />
          {modalInputContent && (
            <button
              className="deleteContentBtn"
              onClick={() => setModalInputContent("")}
            >
              ×
            </button>
          )}
        </div>
        <div className="modalBtns">
          <div
            className={`decisionBtn ${
              modalInputContent.trim() !== "" ? "isActive" : ""
            }`}
            onClick={async() => {
              handleDecisionBtnClick();
              await handleAddDayData();
            }}
          >
            保存
          </div>
          <div
            className="cancelBtn"
            onClick={() => {
              handleDeleteBtnClick();
            }}
          >
            削除
          </div>
          <div
            className="cancelBtn"
            onClick={() => {
              handleCancelBtnClick();
            }}
          >
            キャンセル
          </div>
        </div>
      </div>
    </>
  );
};
