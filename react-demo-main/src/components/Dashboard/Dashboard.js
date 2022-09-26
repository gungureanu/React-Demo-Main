import React, { useEffect, useState } from 'react';
import '../../utils/css/dashboard.css';
import Footer from './Footer';
import navIcon1 from "../../utils/images/nav-icon1.png";
import navIcon2 from "../../utils/images/nav-icon2.png";
import Header from './Header';
import EmployeeList from './Employee/EmployeeList';
import Error from '../ui/Error';
import { useGetEmployeesListQuery } from '../../redux/features/api/apiSilce';
import Loader from '../ui/Loader';
import Cookies from 'js-cookie';
import EditDetails from './Employee/EditDetails';
import UploadedFiles from './Employee/UploadedFiles';
import { useNavigate } from 'react-router-dom';
import Modal from '../ui/Modal';
import Alert from '../ui/Alert';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const [loading, setLoading] = useState(false);
    // If not valid user Redirect to login page
    const navigate = useNavigate();
    const cookie = Cookies.get("user")

    let user;
    if (cookie) user = JSON.parse(cookie)

    useEffect(() => {
        if (user?.userStatus !== "success") {
            setLoading(true)

            setTimeout(() => {
                setLoading(false)
                navigate("/")
            }, 500)
        }
    }, [user, cookie, navigate])

    const [editMode, setEditMode] = useState(true);
    const [pageSize, setPageSize] = useState(15);
    const { data: employeeList, isLoading, isError, refetch } = useGetEmployeesListQuery(pageSize);
    const { userExist } = useSelector(state => state.dashboard);


    // Handle scroll
    const handleScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.target;

        if (scrollTop + clientHeight >= scrollHeight) {
            setTimeout(() => {
                setPageSize((pageSize) => pageSize + 15)
                refetch()
            }, 300);
        }
    }

    // Handle What to render
    let content;
    if (isLoading) content = <Loader />
    if (!isLoading && isError) content = <Error message="Error Occured!" />
    if (!isLoading && !isError) content = employeeList.map(employee => <EmployeeList key={employee.employeeID} employee={employee} />)


    return loading ? <Loader /> : (
        <>
            <section className='dashboard-body'>
                <Header user={user} />
                <div className="main-container">
                    <div className="db-lp">
                        <div className="lp-nav">
                            <div className="lp-nav-item">
                                <img src={navIcon1} alt="Employee Salaries" />
                                <p>Employee Salaries</p>
                            </div>

                            <div className="lp-nav-item">
                                <img src={navIcon2} alt="Security" />
                                <p>Security (Login Audit)</p>
                            </div>

                            {userExist && <Alert />}
                        </div>
                    </div>

                    <div className="db-rp">
                        <div className="header-bar">
                            <p className="page-heading">Employee Salaries</p>
                            <img className="header-bar-img" src={navIcon1} alt="Employee Salaries" />
                        </div>
                        <div className="db-rp-container">
                            <div className="db-cp">
                                <div className="emp-grid-header">
                                    <div className="egh-col1"></div>
                                    <div className="egh-col2">Employee Number</div>
                                    <div className="egh-col3">Employee Name</div>
                                    <div className="egh-col4">Employee Salary</div>
                                    <div className="egh-col5">Actions</div>
                                </div>
                                <div className="emp-grid">
                                    <div className="scrollbar-macosx">
                                        <div onScroll={handleScroll} className="scroll-inner">
                                            {content}
                                        </div>
                                    </div>
                                    <div className='mt-5 d-flex'>
                                        {/* <button className='btn btn-primary me-2'>Download XMS</button> */}
                                        <Modal /> {/* New Employee */}
                                    </div>
                                </div>

                            </div>

                            <div className="db-ep">
                                <div className="ep-tab-panel active">
                                    <div
                                        className={`ep-tab ${editMode && "active"}`}
                                        onClick={() => setEditMode(true)}
                                    >
                                        Edit Details
                                    </div>
                                    <div
                                        className={`ep-tab ${!editMode && "active"}`}
                                        onClick={() => setEditMode(false)}
                                    >
                                        Upload File
                                    </div>
                                </div>

                                <div className="tab-content">
                                    {/* Edit details */}
                                    {editMode && <EditDetails />}

                                    {/* Uploaded files */}
                                    {!editMode && <UploadedFiles />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </section>
        </>
    );

};

export default Dashboard;