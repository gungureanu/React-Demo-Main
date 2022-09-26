import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState, useRef, useEffect } from 'react';
import { useGetEmployeesListQuery, useGetExcelFilesQuery, useReloadMutation } from '../../../redux/features/api/apiSilce';
import Error from '../../ui/Error';
import ExcelFile from './ExcelFile';

const UploadedFiles = () => {
    const [fileError, setFileError] = useState("");
    const [filename, setFilename] = useState("")
    const [file, setFile] = useState('');
    const [upload, setUpload] = useState("");
    const { data: excelFiles = [], refetch: fileRefetch } = useGetExcelFilesQuery();
    const [reload] = useReloadMutation();

    useEffect(() => {
        fileRefetch();
    }, [excelFiles, upload, fileRefetch])

    // Cookie
    const cookie = Cookies.get("user")
    const user = JSON.parse(cookie)

    /* ============ file Upload hanlde Begin ============*/
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null) // ref

    // handle drag events
    const handleCheck = (file) => {
        setFileError('');

        const isExcelFile = file[0].name.split('.')[1];
        setUpload("");
        setFilename(file[0].name)
        const fileSize = file[0].size / 1000000;

        if (fileSize > 2) {
            return setFileError(`Your File size ${fileSize.toFixed(2)}MB. File Size must not more then 1MB!`)
        }

        if (isExcelFile === 'xlsx' || isExcelFile === 'xls') {
            setFile(file[0])
            return
        } else {
            return setFileError("Only Excel .xls or .xlsx support")
        }
    }
    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // triggers when file is dropped
    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            return handleCheck(e.dataTransfer.files)
        }
    };
    // triggers when file is selected with click
    const handleChange = function (e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            return handleCheck(e.target.files)
        }
    };
    // triggers the input when the button is clicked
    const onButtonClick = () => {
        inputRef.current.click();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append("file", file)

        // Upload
        // console.log(url);

        // uploadExcelFile({
        //     userID: user?.userID,
        //     data: formData
        // })
        const url = `https://api.reactdemo.net/api/PostImages?UserID=${user?.userID}`
        axios.post(url, formData)
            .then(res => {
                if (res.data[0] == "formatnotvalid:") {
                    setFileError("File is not in proper format")
                } else {
                    setUpload(res.data[0])
                }
            })
            .then(data => reload(null))
    }
    /* ============ file Upload hanlde END ==========*/
    return (
        <>
            <div className="tab-2-content">
                <div className="file-list">
                    <div className="scrollbar-macosx scrollbar-macosx2">
                        <div className="scroll-inner">
                            {
                                excelFiles.map((excelFile, index) => <ExcelFile key={index} excelFile={excelFile} />)
                            }
                        </div>
                    </div>
                </div>

                <div className="file-upload-container">
                    <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={handleSubmit}>
                        <input
                            ref={inputRef}
                            type="file"
                            id="input-file-upload"
                            multiple={true}
                            onChange={(e) => handleChange(e, this)}
                            name="upload"
                        />
                        <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
                            <div className={!filename ? "w-100 file-upload d-flex justify-content-center align-items-center z-0" : ""}>
                                {
                                    /* Validation */
                                    filename && <p className={`fs-5 ${fileError ? 'text-danger' : 'text-success'}`}>{filename}</p>
                                }
                                {
                                    /* Upload Success */
                                    upload === "success:" && <p className='fs-5 text-success'>Uploaded Successfully</p>
                                }
                                {
                                    /* Error Handle */
                                    fileError && <Error message={fileError} />
                                }
                                <button className="upload-button" onClick={onButtonClick}></button>
                                {(file && !fileError && !upload) && <button type='submit' className="upload-button">Upload</button>}
                            </div>
                        </label>
                        {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
                    </form>
                </div>

            </div>
        </>
    );
};

export default UploadedFiles;