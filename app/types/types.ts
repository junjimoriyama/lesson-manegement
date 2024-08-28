
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

export interface PriceProps {
  month: number
  day : number
  eachPrice: {[key: number]: number}
  totalPrice: number
}

// export interface DayModalProps {
//   modal: boolean
// }