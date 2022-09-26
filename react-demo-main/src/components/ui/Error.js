import React from 'react';

const Error = ({ message }) => {
    return (
        <>
            <div className="alert alert-danger py-1 my-2" role="alert">
                {message}
            </div>
        </>
    );
};

export default Error;