
// ステート、データベースの型
export interface DayInfo {
  year: number,
  month: number,
  day: number,
  contents: string
  isPaid: boolean
}

// 支払いに関する
export interface PaymentProps {
  year: number
  month: number
  day : number
}

// カレンダーに関する
export interface CalendarProps {
  date: Date
  year: number
  month: number
  day: number
  modalOpen: boolean 
  setModalOpen: (open: boolean) => void
  modalInputContent: string
  setModalInputContent: (content: string) => void
  isPaid: boolean
  setIsPaid: (isPaid: boolean) => void
  // paymentDay: PaymentProps[];  // PaymentProps[] を使う
  // setPaymentDay: (paymentDay: PaymentProps[]) => void;
}
// 金額に関する
export interface PriceProps {
  year: number
  month: number
  day : number
  monthPrice : number
  totalPrice: number
}

// 日付変更に関する
export interface dayChangeProps {
  year: number, 
  setYear: (number: number) => void, 
  month: number,
  setMonth: (number: number) => void, 
}


// export interface DayModalProps {
//   modal: boolean
// }