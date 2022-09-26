
import React from 'react';
import { useSelector } from 'react-redux';
import AddEmployee from '../Dashboard/Employee/AddEmployee';

const Modal = () => {
    const { addEmployeeModal } = useSelector(state => state.dashboard);

    return (
        <>
            {/* <!-- Button trigger modal --> */}
            <section>
                <button type="button" className="btn btn-success px-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    New
                </button>

                {/* <!-- Modal --> */}
                <div className={`modal`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content py-5 px-2 ">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Save Employee Details!</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className={`modal-body`}>
                                <AddEmployee />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Modal;