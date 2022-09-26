import React from 'react';
import excelIcon from "../../../utils/images/exl-icon.png";

const ExcelFile = ({ excelFile }) => {
    const { userName, orignalFilename, createdDate } = excelFile;

    return (
        <>
            <div className="file-item">
                <img src={excelIcon} alt="Excel" />
                <div className="file-detail">
                    <p className="file-name">{orignalFilename}</p>
                    <p className="file-owner">Uploaded By: {userName} ({createdDate?.split('T')[0]})</p>
                </div>
            </div>
        </>
    );
};

export default ExcelFile;