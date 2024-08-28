'use client'

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/common/hooks";
import { getDayContent, toggleSelectedDay, deleteDay } from "@/app/redux/Slice";
import { PriceProps } from "../../../types/types";

import "./price.scss";


export const Price: React.FC<PriceProps> = ({
  month,
  day,
  eachPrice,
  totalPrice
}) => {

  return (
    <div className="price">
    <div className="eachPrice">
      {`${[month]}月`}:
    
      {eachPrice[month]}
      {/* {eachPrice[month] > 0 ? eachPrice[month] : 0} */}
    </div>
    <div className="totalPrice">合計:{totalPrice}</div>
  </div>
  )
}
