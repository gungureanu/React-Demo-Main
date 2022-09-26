import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAddEmployeeMutation, useReloadMutation } from '../../../redux/features/api/apiSilce';
import { addEmployeeModal, isUserExist } from '../../../redux/features/dashboard/dashboardSlice';

const AddEmployee = () => {
    const dispatch = useDispatch();
    const [employeeID, setemployeeID] = useState("");
    const [employeeName, setemployeeName] = useState("");
    const [employeeSalary, setemployeeSalary] = useState("");
    const [addEmployee, { data = {} }] = useAddEmployeeMutation();
    const [reload] = useReloadMutation();


    // Cookie for get User ID
    const cookie = Cookies.get("user")

    let user;
    if (cookie) user = JSON.parse(cookie)

    useEffect(() => {
        if (data?.employeeID) {
            reload(null)

            // don't delete
            if (data?.userStatus === "alreadyexist") {
                dispatch(isUserExist({ type: true, existId: data?.employeeID }))
            }
            else (dispatch(isUserExist({ type: false, existId: "" })))
        }
    }, [data, reload]);

    // reset
    const reset = () => {
        setemployeeID("")
        setemployeeName("")
        setemployeeSalary("")

        return
    }

    const handleClick = () => {
        addEmployee({
            employeeID,
            employeeSalary,
            employeeName,
            active: true,
            userID: user?.userID
        });

        // User exist
        if (data?.userStatus === "alreadyexist") {
            dispatch(isUserExist({ type: true, existId: data?.employeeID }))
            reset()

            return
        }
        else {
            dispatch(isUserExist({ type: false, existId: "" }))
            reset()

            return
        }

    }
    return (
        <>
            <div className={`w-100`}>
                <input
                    type="number"
                    name="Login"
                    title="User name"
                    id=""
                    className="login-field"
                    autoComplete="off"
                    spellCheck="false" tabIndex="1"
                    placeholder="Employee ID"
                    required
                    maxLength="100"
                    value={employeeID}
                    onChange={(e) => setemployeeID(e.target.value)}
                />

                <input
                    type="text"
                    name="Employee Name"
                    title="Employee Name"
                    id=""
                    className="login-field"
                    autoComplete="off"
                    spellCheck="false"
                    tabIndex="2"
                    placeholder="Employee Name"
                    required
                    maxLength="100"
                    value={employeeName}
                    onChange={(e) => setemployeeName(e.target.value)}
                />

                <input
                    type="number"
                    name="salary"
                    title="Salary"
                    id="salary"
                    className="login-field"
                    autoComplete="off"
                    spellCheck="false"
                    tabIndex="2"
                    placeholder="Employee Salary"
                    required
                    maxLength="10"
                    value={employeeSalary}
                    onChange={(e) => setemployeeSalary(e.target.value)}
                />
                <button
                    onClick={handleClick}
                    type='submit'
                    className="login-btn btn"
                    tabIndex="4"
                    data-bs-dismiss="modal"
                >
                    SAVE RECORD
                </button>
            </div>
        </>
    );
};

export default AddEmployee;