import { useAppDispatch, useAppSelector } from '@/app/redux/common/hooks';
import { supabase } from '../utils/supabase';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSupabaseData = createAsyncThunk(
  'supabase/fetch',
  async () => {
    const { data, error } = await supabase.from('lesson').select('month, day, contents')
    if (error) {
      throw new Error(error.message)
    }
    return data
  }
)

// データの追加
export const addSupabaseData = createAsyncThunk(
  'supabase/add',
  async ({ addDayData }: {
    addDayData: {
      [month: number]: { [day: number]: string },
    }
  }) => {
    const month = Number(Object.keys(addDayData)[0])
    const day = Number(Object.keys(addDayData[month])
    [0])
    const contents = addDayData[month][day]

    const insertData = {
      month: month,
      day: day,
      contents: contents
    }

    const { data, error } = await supabase.from('lesson').insert(insertData)

    if (error) {
      throw new Error(error.message)
    }

    return data
  }
)

export const updateSupabaseData = createAsyncThunk(
  'supabase/update',
  async ({ updateDayData }: {
    updateDayData: {
      [month: number]: { [day: number]: string },
    }
  }) => {
    const month = Number(Object.keys(updateDayData)[0])
    const day = Number(Object.keys(updateDayData[month])[0])
    const contents = updateDayData[month][day]

    const updateData = {
      month: month,
      day: day,
      contents: contents
    }

    const { data, error } = await supabase
      .from("lesson")
      .update(updateData)
      .match({ month, day })
      
    if (error) {
      throw new Error(error.message)
    }
    return data
  }
)

// データ削除
export const deleteSupabaseData = createAsyncThunk(
  'supabase/delete',
  async ({deleteDayData}: {
    deleteDayData: {
      [month: number]: { [day: number]: string },
    }
  }) => {
    const month = Number(Object.keys(deleteDayData)[0])
    const day = Number(Object.keys(deleteDayData[month])[0])

    const {data, error} = await supabase
      .from('lesson')
      .delete()
      .match({month, day})

      if (error) {
        throw new Error(error.message)
      }
      return data
  }
)