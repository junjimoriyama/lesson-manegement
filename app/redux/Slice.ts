// import { getModalContent } from '@/app/redux/Slice';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { pageInitialState } from './common/hooks';


// const initialState = {
//   contents: ""
// }
const date = new Date()
const currentMonth = date.getMonth() + 1
const currentDay = date.getDate() + 1

interface selectedDayProp {
  [month: number]:
  {[day: number]: string},
}

const initialState = {
  dayInfo: <selectedDayProp>{}
}

export const modalSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    getModalContent(state, action) {
      const {month, day, content} = action.payload
      if(!state.dayInfo[month]) {
          state.dayInfo[month] = {}
      }
      state.dayInfo[month][day] = content
    },
    // selectedDay(state, action) {
    //   const {month, day} = action.payload;
    
    //   if (!state.dayInfo[month]) {
    //     state.dayInfo[month] = {};
    //   }
    // }
  }
})

export const {getModalContent,} = modalSlice.actions

export default modalSlice.reducer

// export const PageSlice = createSlice({
//   name: 'page',
//   initialState: { page: 'all' } as pageInitialState,

//   reducers: {
//     selectedNumber: (state, action: PayloadAction<number | string>) => {
//       state.page = action.payload;
//     },
//   },
// });

// export const { selectedNumber } = PageSlice.actions;

// export default PageSlice.reducer;
