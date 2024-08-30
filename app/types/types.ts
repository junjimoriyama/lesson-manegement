
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
}
// 金額に関する
export interface PriceProps {
  month: number
  day : number
  eachPrice: {[key: number]: number}
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