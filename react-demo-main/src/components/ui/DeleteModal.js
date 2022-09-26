import React from 'react';

const DeleteModal = ({ id, handleDelete }) => {
    return (
        <>
            <section>
                <button type="button" className="btn btn-del" data-bs-toggle="modal" data-bs-target="#exampleModalDel">
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
                                <button
                                    onClick={(e) => handleDelete(e, id)}
                                    className="action-btn btn-danger px-5"
                                    data-bs-dismiss="modal"
                                >
                                    Yes
                                </button>
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
        </>
    );
};

export default DeleteModal;