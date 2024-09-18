"use client";
// component
import { PriceLogo } from "@/public/svg/svg";
// types
import { PriceProps } from "../../types/types";
// style
import "./price.scss";

export const Price: React.FC<PriceProps> = ({
  month,
  monthPrice,
  totalPrice,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP').format(price)
  }
  return (
    <div className="price">
      <div className="priceLogoWrap">
      <PriceLogo />
      </div>
      <div className="priceWrap">
        <div className="eachPrice">
          <p >{`${[month]}月`}: </p>
          <p>{formatPrice(monthPrice)}円</p>
        </div>
        <div className="totalPrice">合計: {formatPrice(totalPrice)}円</div>
      </div>
    </div>
  );
};
