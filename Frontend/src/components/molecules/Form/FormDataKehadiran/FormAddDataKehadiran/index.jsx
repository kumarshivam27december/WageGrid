import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import Layout from '../../../../../layout';
import Swal from 'sweetalert2';
import { Breadcrumb, ButtonOne, ButtonTwo } from '../../../../../components';
import { BiSearch } from 'react-icons/bi';
import { getMe } from '../../../../../config/redux/action';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';

const ITEMS_PER_PAGE = 4;

const FormAddDataKehadiran = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPegawai, setDataPegawai] = useState([]);
    const [dataKehadiran, setDataKehadiran] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const { isError, user } = useSelector((state) => state.auth);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const totalPages = Math.ceil(dataPegawai.length / ITEMS_PER_PAGE);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const filteredDataPegawai = dataPegawai.filter((pegawai) =>
        pegawai.nama_pegawai.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    const getDataPegawai = async () => {
        const response = await axios.get("http://localhost:5000/data_pegawai");
        setDataPegawai(response.data);
    };

    const getDataKehadiran = async () => {
        try {
            const response = await axios.get("http://localhost:5000/data_kehadiran");
            setDataKehadiran(response.data);
        } catch (error) {
            console.error("Error fetching attendance data:", error);
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const [hadir, setHadir] = useState([]);
    const [sakit, setSakit] = useState([]);
    const [alpha, setAlpha] = useState([]);

    const handleHadir = (index, value) => {
        const updated = [...hadir];
        updated[index] = value;
        setHadir(updated);
    };

    const handleSakit = (index, value) => {
        const updated = [...sakit];
        updated[index] = value;
        setSakit(updated);
    };

    const handleAlpha = (index, value) => {
        const updated = [...alpha];
        updated[index] = value;
        setAlpha(updated);
    };

    const handleSearch = (e) => {
        setSearchKeyword(e.target.value);
    };

    const saveDataKehadiran = async (e) => {
        e.preventDefault();

        try {
            for (let i = 0; i < dataPegawai.length; i++) {
                const alreadyExists = dataKehadiran.some(
                    (item) => item.nama_pegawai === dataPegawai[i].nama_pegawai
                );

                if (!alreadyExists) {
                    await axios.post("http://localhost:5000/data_kehadiran", {
                        nik: dataPegawai[i].nik,
                        nama_pegawai: dataPegawai[i].nama_pegawai,
                        nama_jabatan: dataPegawai[i].jabatan,
                        jenis_kelamin: dataPegawai[i].jenis_kelamin,
                        hadir: hadir[i] || 0,
                        sakit: sakit[i] || 0,
                        alpha: alpha[i] || 0,
                    });

                    Swal.fire({
                        icon: 'success',
                        title: "Success",
                        text: "Attendance data saved successfully",
                        showConfirmButton: false,
                        timer: 1500,
                    });

                    navigate("/data-kehadiran");
                }
            }
        } catch (error) {
            if (error.response) {
                Swal.fire({
                    title: "Error",
                    text: error.response.data.msg,
                    icon: "error",
                });
            }
        }
    };

    const paginationItems = () => {
        const items = [];
        const maxVisiblePages = 5;
        const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        for (let page = startPage; page <= endPage; page++) {
            items.push(
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`py-2 px-4 border border-gray-2 text-black font-semibold dark:text-white dark:border-strokedark ${currentPage === page ? 'bg-primary text-white hover:bg-primary dark:bg-primary dark:hover:bg-primary' : 'hover:bg-gray-2 dark:hover:bg-stroke'} rounded-lg`}
                >
                    {page}
                </button>
            );
        }

        if (startPage > 2) {
            items.unshift(
                <p key="start-ellipsis" className="py-2 px-4 border border-gray-2 text-black font-medium dark:border-strokedark dark:text-white">
                    ...
                </p>
            );
        }

        if (endPage < totalPages - 1) {
            items.push(
                <p key="end-ellipsis" className="py-2 px-4 border border-gray-2 text-black font-medium dark:border-strokedark dark:text-white">
                    ...
                </p>
            );
        }

        return items;
    };

    useEffect(() => {
        getDataPegawai();
        getDataKehadiran();
    }, []);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) navigate('/login');
        if (user && user.hak_akses !== 'admin') navigate('/dashboard');
    }, [isError, user, navigate]);

    return (
        <Layout>
            <Breadcrumb pageName="Employee Attendance Form" />
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 mt-6">
                <form onSubmit={saveDataKehadiran}>
                    <div className="flex justify-between items-center mt-4 flex-col md:flex-row">
                        <div className="relative flex-2 mb-4 md:mb-0">
                            <input
                                type="text"
                                placeholder="Search employee name..."
                                value={searchKeyword}
                                onChange={handleSearch}
                                className="rounded-lg border-[1.5px] border-stroke bg-transparent py-2 pl-10 font-medium outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                            <span className="absolute left-2 py-3 text-xl">
                                <BiSearch />
                            </span>
                        </div>
                    </div>

                    <div className="max-w-full overflow-x-auto py-4">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                    <th className="py-4 px-4">No</th>
                                    <th className="py-4 px-4">NIK</th>
                                    <th className="py-4 px-4">Employee Name</th>
                                    <th className="py-4 px-4">Position</th>
                                    <th className="py-4 px-4">Gender</th>
                                    <th className="py-4 px-4">Present</th>
                                    <th className="py-4 px-4">Sick</th>
                                    <th className="py-4 px-4">Absent</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDataPegawai.slice(startIndex, endIndex).map((data, index) => {
                                    const exists = dataKehadiran.some(
                                        (d) => d.nama_pegawai === data.nama_pegawai
                                    );

                                    if (exists) {
                                        return (
                                            <tr key={data.id} className="border-b dark:border-strokedark">
                                                <td className="py-5 px-4 text-center text-black dark:text-white">{startIndex + index + 1}</td>
                                                <td colSpan="7" className="py-5 px-4 text-center text-black dark:text-white">
                                                    Attendance already recorded. Please enter again after changing the period.
                                                </td>
                                            </tr>
                                        );
                                    }

                                    return (
                                        <tr key={data.id} className="border-b dark:border-strokedark">
                                            <td className="py-5 px-4 text-center text-black dark:text-white">{startIndex + index + 1}</td>
                                            <td className="py-5 px-4 text-black dark:text-white">{data.nik}</td>
                                            <td className="py-5 px-4 text-black dark:text-white">{data.nama_pegawai}</td>
                                            <td className="py-5 px-4 text-black dark:text-white">{data.jabatan}</td>
                                            <td className="py-5 px-4 text-black dark:text-white">{data.jenis_kelamin}</td>
                                            <td className="py-5 px-4">
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    value={hadir[index] || ""}
                                                    onChange={(e) => handleHadir(index, e.target.value)}
                                                    className="form-input h-8 w-10 text-center border rounded-md dark:border-form-strokedark dark:bg-form-input"
                                                    min="0"
                                                    required
                                                />
                                            </td>
                                            <td className="py-5 px-4">
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    value={sakit[index] || ""}
                                                    onChange={(e) => handleSakit(index, e.target.value)}
                                                    className="form-input h-8 w-10 text-center border rounded-md dark:border-form-strokedark dark:bg-form-input"
                                                    min="0"
                                                    required
                                                />
                                            </td>
                                            <td className="py-5 px-4">
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    value={alpha[index] || ""}
                                                    onChange={(e) => handleAlpha(index, e.target.value)}
                                                    className="form-input h-8 w-10 text-center border rounded-md dark:border-form-strokedark dark:bg-form-input"
                                                    min="0"
                                                    required
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-between items-center mt-4 flex-col md:flex-row">
                        <span className="text-sm text-gray-5 dark:text-gray-4 py-4">
                            Showing {startIndex + 1} - {Math.min(endIndex, filteredDataPegawai.length)} of {filteredDataPegawai.length} employee records
                        </span>
                        <div className="flex space-x-2 py-4">
                            <button
                                disabled={currentPage === 1}
                                onClick={goToPrevPage}
                                className="py-2 px-6 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-white dark:border-primary dark:text-white dark:hover:bg-primary"
                            >
                                <MdKeyboardDoubleArrowLeft />
                            </button>
                            {paginationItems()}
                            <button
                                disabled={currentPage === totalPages}
                                onClick={goToNextPage}
                                className="py-2 px-6 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-white dark:border-primary dark:text-white dark:hover:bg-primary"
                            >
                                <MdKeyboardDoubleArrowRight />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-3 text-center py-4">
                        <ButtonOne type="submit">
                            <span>Save</span>
                        </ButtonOne>
                        <Link to="/data-kehadiran">
                            <ButtonTwo>
                                <span>Back</span>
                            </ButtonTwo>
                        </Link>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default FormAddDataKehadiran;
