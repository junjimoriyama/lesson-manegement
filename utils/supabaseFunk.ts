import { useAppDispatch, useAppSelector } from '@/app/redux/common/hooks';
import { supabase } from '../utils/supabase';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSupabaseData = createAsyncThunk(
  'supabase/fetch',
  async () => {
    const { data, error } = await supabase.from('lesson').select('year, month, day, contents, isPaid')
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
      year: number,
      month: number,
      day: number,
      contents: string,
      isPaid: boolean
    }
  }) => {

    const { data, error } = await supabase.from('lesson').insert(addDayData)
    
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
      year: number,
      month: number,
      day: number,
      contents: string,
      isPaid: boolean
    }
  }) => {

    const { data, error } = await supabase
      .from("lesson")
      .update(updateDayData)
      .match({ 
        year: updateDayData.year, 
        month: updateDayData.month, 
        day: updateDayData.day 
      })

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
      year: number,
      month: number,
      day: number,
    }
  }) => {

    const {data, error} = await supabase
      .from('lesson')
      .delete()
      .match({
        year: deleteDayData.year,
        month: deleteDayData.month,
        day: deleteDayData.day
      })

      if (error) {
        throw new Error(error.message)
      }
      return data
  }
)