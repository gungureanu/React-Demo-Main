import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useUpdateEmployeeMutation } from '../../../redux/features/api/apiSilce';

const EditDetails = () => {
    const { editEmployee } = useSelector(state => state.dashboard);
    const [edit] = useUpdateEmployeeMutation();

    const [type, setType] = useState("")
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [salary, setSalary] = useState("")

    useEffect(() => {
        setId(editEmployee?.employeeID)
        setName(editEmployee?.employeeName)
        setSalary(editEmployee?.employeeSalary)
    }, [editEmployee])

    const handleUpdate = () => {
        let updatedData;

        if (type === "employeeName") {
            updatedData = {
                UserID: "bb616b73-b731-4b98-98db-5465bb8a7d50",
                id: id.toString(),
                tableName: "system_Employee",
                columnName: "EmployeeName",
                columnValue: name,
                condition: "EmployeeID"

            }
            return edit(updatedData)
        }
        if (type === "employeeSalary") {
            updatedData = {
                UserID: "bb616b73-b731-4b98-98db-5465bb8a7d50",
                id: id.toString(),
                tableName: "system_Employee",
                columnName: "EmployeeSalary",
                columnValue: salary,
                condition: "EmployeeID"

            }
            return edit(updatedData)
        }
    }

    return (
        <>
            <div className="tab-1-content">
                <div className="scroll-inner">
                    <div className="ep-form">
                        <label className="ep-title">Employee Number</label>
                        <input className="ep-field" type="text" value={id || ""} readOnly />
                    </div>
                    <div className="ep-form">
                        <label className="ep-title" >Employee Name</label>
                        <input
                            className="ep-field text-cyan"
                            value={name}
                            type="text"
                            name="employeeName"
                            onChange={(e) => {
                                setType(e.target.name)
                                setName(e.target.value)
                            }}
                            onBlur={handleUpdate}
                        />
                    </div>
                    <div className="ep-form">
                        <label className="ep-title" >Employee Salary</label>
                        <input
                            className="ep-field text-cyan"
                            name="employeeSalary"
                            value={salary}
                            type="text"
                            onChange={(e) => {
                                setType(e.target.name)
                                setSalary(e.target.value)
                            }}
                            onBlur={handleUpdate}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditDetails;