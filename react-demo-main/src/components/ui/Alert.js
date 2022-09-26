import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Alert = () => {
    const [close, setClose] = useState(false);
    const { existId } = useSelector(state => state.dashboard)

    return (
        <>
            <section className={`${close && "d-none"}`}>
                <div className='custom-alert'>
                    <h5 className='text-danger'>Record Already Exist!</h5>
                    <p className='mb-5 fw-bold'>Employee already exists on this employee number: {existId}</p>

                    <div>
                        <button onClick={() => setClose(true)} className='btn btn-primary'>Close</button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Alert;