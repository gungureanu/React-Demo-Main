import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    isLoading: false,
    isError: false,
    error: '',
    editEmployee: {},
    selectedId: "",
    userExist: false,
    existId: '',
    addEmployeeModal: false,
    deleteMode: false,
    deleteId: '',
    logout: true
}

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        editEmployeeDetails: (state, action) => {
            state.editEmployee = action.payload.employee
            state.selectedId = action.payload.employeeID
        },
        isUserExist: (state, action) => {
            state.userExist = action.payload.type
            state.existId = action.payload.existId
        },
        addEmployeeModal: (state, action) => {
            state.addEmployeeModal = action.payload
        },
        deleteModeAction: (state, action) => {
            state.deleteMode = action.payload.mode
            state.deleteId = action.payload.id
        },
        logOut: (state, action) => {
            state.logout = true
        }
    }
})

export default dashboardSlice.reducer;
export const { editEmployeeDetails, isUserExist, addEmployeeModal, deleteModeAction } = dashboardSlice.actions;