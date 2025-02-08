import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EnrolledCourse } from '../types';

interface UserState {
  enrolledCourses: EnrolledCourse[];
}

const initialState: UserState = {
  enrolledCourses: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    enrollCourse: (state, action: PayloadAction<EnrolledCourse>) => {
      state.enrolledCourses.push(action.payload);
    },
    updateProgress: (state, action: PayloadAction<{ courseId: number; progress: number }>) => {
      const course = state.enrolledCourses.find(c => c.id === action.payload.courseId);
      if (course) {
        course.progress = action.payload.progress;
      }
    },
    markCompleted: (state, action: PayloadAction<number>) => {
      const course = state.enrolledCourses.find(c => c.id === action.payload);
      if (course) {
        course.completed = true;
        course.progress = 100;
      }
    },
  },
});

export const { enrollCourse, updateProgress, markCompleted } = userSlice.actions;
export default userSlice.reducer;