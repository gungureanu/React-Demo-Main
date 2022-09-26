import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDelteEmployeeQuery, useReloadMutation } from '../../../redux/features/api/apiSilce';
import { deleteModeAction, editEmployeeDetails } from '../../../redux/features/dashboard/dashboardSlice';
import userIcon from "../../../utils/images/user-icon.png";


const EmployeeList = ({ employee }) => {
    const { employeeID, employeeName, employeeSalary } = employee;
    const dispatch = useDispatch();
    const { deleteId, deleteMode } = useSelector(state => state.dashboard)
    const [skip, setSkip] = useState(true);
    const { data: deletedData = [], refetch } = useDelteEmployeeQuery(deleteId, { skip: skip })
    const [afterDelete] = useReloadMutation();
    const { selectedId } = useSelector(state => state.dashboard);

    useEffect(() => {
        if (deletedData?.length > 0) {
            afterDelete(null)
        }
    }, [deletedData, afterDelete]);

    // Handle Clicks
    const handleClick = () => dispatch(editEmployeeDetails({ employee, employeeID }))

    const handleDelete = (e) => {
        e.stopPropagation();

        if (deleteMode) {
            setSkip(false);
            refetch()
        }
        return
    }

    return (
        <>
            <div
                onClick={handleClick}
                className={`emp-grid-row ${selectedId === employeeID && "selected"}`}>
                <div className="eg-col1">
                    <img src={userIcon} alt="User" />
                </div>
                <div className="eg-col2">{employeeID}</div>
                <div className="eg-col3">{employeeName}</div>
                <div className="eg-col4"> &#36;{employeeSalary}</div>
                <div className="eg-col5">
                    <section>
                        <button
                            onClick={() => dispatch(deleteModeAction({ mode: true, id: employeeID }))}
                            type="button" className="btn btn-del" data-bs-toggle="modal" data-bs-target="#exampleModalDel">
                            Del
                        </button>

                        {/* <!-- Modal --> */}
                        <div className="modal" id="exampleModalDel" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content py-5 px-2 ">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Are You Sure Delete?</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body d-flex">
                                        <div
                                            onClick={handleDelete}
                                        >
                                            <button
                                                className="action-btn btn-danger px-5"
                                                data-bs-dismiss="modal"
                                                name={employeeID}
                                            >
                                                Yes
                                            </button>
                                        </div>
                                        <button
                                            className="action-btn btn-primary me-2 px-5"
                                            data-bs-dismiss="modal"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* <button onClick={(e) => handleDelete(e, employeeID)}>Del</button> */}
                </div>
            </div>
        </>
    );
};

export default EmployeeList;