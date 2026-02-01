import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

type Employee = {
    id: number;
    name: string;
    email: string;
    designation: string;
    longitude: string;
    latitude: string;
};

const EmployeeTable = () => {
    const [data, setData] = useState<Employee[]>([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(9);
    const [total, setTotal] = useState(0);

    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1); // reset page on new search
        }, 500);

        return () => clearTimeout(handler);
    }, [search]);


    const fetchData = async () => {
        try {
            const res = await axios.get(
                `http://localhost:3000/employees`, {
                params: {
                    page,
                    limit,
                    search: debouncedSearch,
                },
            }
            );
            setData(res.data.data);
            setTotal(res.data.total);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        fetchData();
    }, [page, debouncedSearch]);

    const navigate = useNavigate();
    const editData = async (id: number) => {
        navigate(`/edit/${id}`);
    }

    const deleteData = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3000/employees/${id}`);
            fetchData();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="md:px-20 py-5 h-165 rounded-md">
            <div className="flex items-center justify-between">
                <input
                    type="text"
                    placeholder="Search by email"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-blue-300 shadow-xs rounded-md p-2 w-80"
                />

                <button className="border p-2 cursor-pointer rounded-md bg-blue-600 text-white px-5">
                    <Link to='/create'>Create Employees</Link>
                </button>

            </div>
            <div className="py-5 h-130 rounded-md">
                <table className="w-full shadow-md">
                    <thead>
                        <tr className="border-t border-b border-blue-200 ">
                            <th className="p-3 text-start">Name</th>
                            <th className="p-3 text-start">Email</th>
                            <th className="p-3 text-start">Designation</th>
                            <th className="p-3 text-start">latitude</th>
                            <th className="p-3 text-start">longitude</th>
                            <th className="p-3 text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index} className="hover:bg-blue-200">
                                <td className="p-3">{item.name}</td>
                                <td className="p-3">{item.email}</td>
                                <td className="p-3">{item.designation}</td>
                                <td className="p-3">{item.latitude}</td>
                                <td className="p-3">{item.longitude}</td>
                                <td className="p-3 flex text-end items-end justify-end gap-4">
                                    <button className="px-2 rounded-sm shadow-xs border border-blue-300 cursor-pointer" onClick={() => { editData(item.id) }}>Edit</button>
                                    <button className="px-2 rounded-sm shadow-xs border border-blue-300 cursor-pointer" onClick={() => { deleteData(item.id) }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="h-15">
                <Pagination
                    page={page}
                    total={total}
                    limit={limit}
                    onPageChange={setPage}
                />
            </div>
        </div>
    );
};

export default EmployeeTable;
