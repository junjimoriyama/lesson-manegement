"use client";

import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { CalendarProps } from "../../../types/types";

import { useAppDispatch, useAppSelector } from "@/app/redux/common/hooks";
import { addDay, deleteDay } from "@/app/redux/Slice";

import "./dayModal.scss";
import {
  addSupabaseData,
  deleteSupabaseData,
  fetchSupabaseData,
  updateSupabaseData,
  // updateSupabaseData,
  // deleteSupabaseData
} from "@/utils/supabaseFunk";

export const DayModal: React.FC<CalendarProps> = ({
  year,
  month,
  day,
  modalOpen,
  setModalOpen,
  modalInputContent,
  setModalInputContent,
}) => {
  const dayInfo = useAppSelector((state) => state.calendar);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (modalOpen) {
      setModalInputContent(
        dayInfo.find(
          (d) => d.year === year && d.month === month && d.day === day
        )?.contents || ""
      );
    }
  }, [modalOpen]);

  const handleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setModalInputContent(e.target.value);
    },
    [modalInputContent]
  );

  // 決定ボタン押したらデータを加える、また更新
  const handleDecisionBtnClick = async () => {
    const selectedInfo = dayInfo.find(
      (info) => info.year === year && info.month === month && info.day === day
    );

    let resultAction

    if (!selectedInfo) {
      // 加える
      resultAction = await dispatch(
        addSupabaseData({
          addDayData: {
            year,
            month,
            day,
            contents: modalInputContent,
          },
        })
      );
    } else {
      // 更新
      resultAction = await dispatch(
        updateSupabaseData({
          updateDayData: {
            year,
            month,
            day,
            contents: modalInputContent,
          },
        })
      );
    }
     // 成功した場合のみReduxの状態を更新
  if (resultAction.meta.requestStatus === 'fulfilled') {
    dispatch(
      addDay({
        year,
        month,
        day,
        contents: modalInputContent,
      })
    );
  }
    setModalOpen(false);
  };

  const handleDeleteBtnClick = async () => {
    const resultAction = await dispatch(
      deleteSupabaseData({
        deleteDayData: {
          year,
          month,
          day,
        },
      })
    );
    if (deleteSupabaseData.fulfilled.match(resultAction)) {
      dispatch(
        deleteDay({
          year,
          month,
          day,
        })
      );
    } else {
      console.error(resultAction.error);
    }
    setModalOpen(false);
  };
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
            onClick={() => {
              handleDecisionBtnClick();
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
