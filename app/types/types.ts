
export interface CalendarProps {
  date: Date
  year: number
  month: number
  day: number
  modalOpen: boolean 
  setModalOpen: (open: boolean) => void
}

// export interface DayModalProps {
//   modal: boolean
// }