import { supabase } from '@/utils/supabase';
import { Calendar } from './../components/calendar/Calendar';
import { fetchSupabaseData } from '@/utils/supabaseFunk';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface dayContentProp {
  [month: number]:
  { [day: number]: string },
}

const initialState = {
  dayInfo: <dayContentProp>{},
}

export const calendarSlice = createSlice({
  name: 'day',
  initialState,

  // データベース接続
  extraReducers(builder) {
    builder.addCase(fetchSupabaseData.fulfilled, (state, action) => {
      const dayMapData: dayContentProp = {}
      action.payload.forEach((data: {month: number, day: number, contents: string}) => {
        if(!dayMapData[data.month]) {
          dayMapData[data.month] = {}
        }
        dayMapData[data.month][data.day] = data.contents
      })
      state.dayInfo = dayMapData
    })
  },
  reducers: {
    getDayContent(state, action) {
      const { month, day, content } = action.payload
      if (!state.dayInfo[month]) {
        state.dayInfo[month] = {}
      }
      state.dayInfo[month][day] = content
    },

    toggleSelectedDay(state, action) {
      const { month } = action.payload
      if (!state.dayInfo[month]) {
        state.dayInfo[month] = {}
      }

    },
    deleteDay(state, action) {
      const { month, day } = action.payload;
      if (state.dayInfo[month]) {
        const newDayInfo = state.dayInfo[month]
        delete state.dayInfo[month][day]
        state.dayInfo[month] = newDayInfo
      }
      delete state.dayInfo[month][day]
    },
    calcTotalPrice(state, action) {
      const { month, day } = action.payload;
      
    },
    calcEachPrice(state, action) {

    },
  }
})

export const { getDayContent, toggleSelectedDay, deleteDay, calcTotalPrice, calcEachPrice } = calendarSlice.actions

export default calendarSlice.reducer


