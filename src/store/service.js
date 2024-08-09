// src/apiService.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiBaseUrl =
  ' https://vlsg51x2rc.execute-api.ap-south-1.amazonaws.com/dev'

export const apiService = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl }),
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (newTask) => ({
        url: '/task',
        method: 'POST',
        body: newTask,
      }),
    }),
    getTasks: builder.query({
      query: () => '/tasks',
    }),
    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `/task/${taskId}`,
        method: 'DELETE',
      }),
    }),
    updateTask: builder.mutation({
      query: ({ id, ...updatedTask }) => ({
        url: `/task/${id}`,
        method: 'PUT',
        body: updatedTask,
      }),
    }),
  }),
})

export const {
  useCreateTaskMutation,
  useGetTasksQuery,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = apiService
