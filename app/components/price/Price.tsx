'use client'

import React, { useEffect, useState } from "react";
import { PriceProps } from "../../types/types";

import "./price.scss";
import { PriceLogo } from "@/public/svg/svg";

export const Price: React.FC<PriceProps> = ({
  month,
  monthPrice,
  totalPrice
}) => {

  return (
    <div className="price">
      <PriceLogo/>
    <div className="eachPrice">
      {`${[month]}月`}: {monthPrice}</div>
    <div className="totalPrice">合計:{totalPrice}</div>
  </div>
  )
}
