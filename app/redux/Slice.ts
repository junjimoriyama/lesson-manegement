import { supabase } from '@/utils/supabase';
import { Calendar } from './../components/calendar/Calendar';
import { fetchSupabaseData } from '@/utils/supabaseFunk';
import { createSlice } from '@reduxjs/toolkit';

interface DayInfo {
  year: number,
  month: number,
  day: number,
  contents: string
  isPaid: boolean
}

const initialState: DayInfo[] = []

export const calendarSlice = createSlice({
  name: 'day',
  initialState,

  // データベース接続
  extraReducers(builder) {
    builder.addCase(fetchSupabaseData.fulfilled, (state, action) => {
      const dayMapData = action.payload.map(data => ({
        year: data.year,
        month: data.month,
        day: data.day,
        contents: data.contents,
        isPaid: data.isPaid
      }))
      return dayMapData
    })
  },

  reducers: {
    addDay(state, action) {
      const { year, month, day, contents, isPaid } = action.payload;

      const existState = state.find(each => each.year === year &&
        each.month === month  && each.day === day
      )
      if(existState) {
        existState.contents = contents
      } else {
        state.push(action.payload)
      }
    },

    deleteDay(state, action) {
      const { year, month, day} = action.payload
      
      state = state.filter(each => !(each.year === year &&
        each.month === month  && each.day === day))
    
        return state
    },
  }
})

export const { addDay, deleteDay } = calendarSlice.actions

export default calendarSlice.reducer