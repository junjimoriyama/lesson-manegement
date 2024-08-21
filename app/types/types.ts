
export interface CalendarProps {
  date: Date
  year: number
  month: number
  day: number
  modalOpen: boolean 
  setModalOpen: (open: boolean) => void
  onReceiveContent: any
  displayLessonContents: {[key: number]: {[key: number]: string}}
}

// export interface DayModalProps {
//   modal: boolean
// }