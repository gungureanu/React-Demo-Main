import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.reactdemo.net/api",
        mode: "cors",
        prepareHeaders: (headers) => {
            headers.set('Access-Control-Allow-Origin', '*')
            headers.set("Content-Type", "application/json")

            return headers;
        },
        tagTypes: ["employeeList", "addEmployee", 'login', 'editEmployee', "deleteEmployee", "uploadFileList"],
    }),
    endpoints: (builder) => ({
        getEmployeesList: builder.query({
            query: (pageSize) => `/GetEmployeeList?pageNo=1&pageSize=${pageSize}`,
            providesTags: ["employeeList"]
        }),
        delteEmployee: builder.query({
            query: (id) => {
                return `/DeleteEmployee/${id}`
            },
            providesTags: ["deleteEmployee"]
        }),
        reload: builder.mutation({
            query: (id) => `/DeleteEmployee/${id}`,// just for demo req
            invalidatesTags: ["employeeList"]
        }),

        addEmployee: builder.mutation({
            query: (data) => {
                return ({
                    method: "POST",
                    url: `/AddEmployee`,
                    body: data
                })
            },
            invalidatesTags: ["employeeList"]
        }),
        login: builder.mutation({
            query: ({ emailAddress, password }) => ({
                method: "POST",
                url: `/AppLogin`,
                body: { emailAddress, password }
            }),
            providesTags: ["login"]
        }),
        updateEmployee: builder.mutation({
            query: (employeeData) => {
                return ({
                    method: "POST",
                    url: `/EditEmployeeByID`,
                    body: employeeData
                })
            },
            invalidatesTags: ["employeeList"]
        }),
        getExcelFiles: builder.query({
            query: () => `/GetUploadFileList`,
            providesTags: ["uploadFileList"]
        }),
        uploadExcelFile: builder.mutation({
            query: ({ userID, data }) => {
                // console.log(userID, data);
                const url = `/PostImages?UserID=${userID}`
                console.log(url);
                return ({
                    method: "POST",
                    url: `/PostImages?UserID=${userID}`,
                    body: data
                })
            },
            withCredentials: true,
            invalidatesTags: ["employeeList"]
        }),
    }),
});

export const {
    useLoginMutation,
    useGetEmployeesListQuery,
    useUpdateEmployeeMutation,
    useDelteEmployeeQuery,
    useAddEmployeeMutation,
    useReloadMutation,
    useGetExcelFilesQuery,
    useUploadExcelFileMutation
} = apiSlice;