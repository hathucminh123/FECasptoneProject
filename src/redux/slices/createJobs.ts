import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
interface JobFormData {
  id:string,
  title: string,
  selectedDate: Date|null,
  count: number,
  city: string,
  district: string,
  specificLocation:string,
  skills: string[],
  description: string,
  requirements: string,
  benefits: string,
  selectedFile: File[],
};


interface Job {
    item: JobFormData[];
  }
  


  const initialState: Job = {
    item: [], 
  };


  
export const createJobSlice = createSlice({
    name: "Create",
    initialState,
    reducers: {
  
      add: (state, action: PayloadAction<JobFormData>) => {
        const jobExists = state.item.find((job) => job.id === action.payload.id);
        if (!jobExists) {
          state.item.push(action.payload);
        }
      },
  
      remove: (state, action: PayloadAction<string>) => {
        state.item = state.item.filter((job) => job.id !== action.payload); 
      },
    },
  });
  
  // Export the actions for dispatching
  export const { add, remove } = createJobSlice.actions;
  
  // Selector to access the job items in the state
  export const selectJob = (state: RootState) => state.create.item;
  
  
  export default createJobSlice.reducer;
  

