import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Course } from '../types';

interface CoursesState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

const initialState: CoursesState = {
  courses: [],
  loading: false,
  error: null,
};

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  const response = await axios.get('http://localhost:3000/api/courses');
  return response.data;
});

export const updateCourseLikes = createAsyncThunk(
  'courses/updateLikes',
  async (courseId: number) => {
    const response = await axios.post(`http://localhost:3000/api/courses/${courseId}/like`);
    return response.data;
  }
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    updateLikes: (state, action) => {
      const { courseId, likes } = action.payload;
      const course = state.courses.find(c => c.id === courseId);
      if (course) {
        course.likes = likes;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch courses';
      });
  },
});

export const { updateLikes } = coursesSlice.actions;
export default coursesSlice.reducer;