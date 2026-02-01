import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

type EmployeeForm = {
    name: string;
    email: string;
    designation: string;
    password: string;
    address: string;
};


const EmployeeForm = () => {
    const [formData, setFormData] = useState<EmployeeForm>({
        name: "",
        email: "",
        designation: "",
        password: "",
        address: ""
    });

    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const fetchEmployee = async () => {
        try {
            const res = await axios.get(
                `http://localhost:3000/employees/${id}`
            );
            // console.log(res.data);
            setFormData({
                name: res.data.data.name,
                email: res.data.data.email,
                designation: res.data.data.designation,
                password: "", // never auto-fill password
                address: ''
            });
        } catch (err) {
            console.error(err);
        }
    };

    // 🔹 Fetch employee when editing
    useEffect(() => {
        if (id) {
            fetchEmployee();
        }
    }, [id]);

    // 🔹 Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const navigate = useNavigate();
    // 🔹 Submit (Create / Update)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (id) {
                // UPDATE
                await axios.patch(
                    `http://localhost:3000/employees/${id}`,
                    formData
                );
                alert("Employee updated successfully");
            } else {
                // CREATE
                await axios.post(
                    "http://localhost:3000/employees",
                    formData
                );
                alert("Employee created successfully");
            }
            navigate('/')
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section>
            <header className="md:px-20 h-20 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold">
                        {id ? "Update Employee" : "Create Employee"}
                        <p className="text-sm font-normal">create and update employees</p>
                    </h2>
                </div>
                <div>
                    <button className="border p-2 cursor-pointer rounded-md bg-gray-600 text-white px-5">
                        <Link to='/'>Employees</Link>
                    </button>
                </div>
            </header>
            <form
                onSubmit={handleSubmit}
                className="max-w-3xl gap-3 bg-white p-10 mt-2 mx-auto grid grid-cols-1 md:grid-cols-2 shadow rounded space-y-4"
            >

                <div>
                    <p>Name</p>
                    <input
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border p-2"
                        required
                    />
                </div>

                <div>
                    <p>Email</p>
                    <input
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border p-2"
                        required
                    />
                </div>

                <div>
                    <p>Designation</p>
                    <input
                        name="designation"
                        placeholder="Designation"
                        value={formData.designation}
                        onChange={handleChange}
                        className="w-full border p-2"
                        required
                    />
                </div>

                {id ? (<div></div>) : (
                    <div>
                        <p>Password</p>
                        <input
                            name="password"
                            type="password"
                            placeholder={id ? "New Password (optional)" : "Password"}
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border p-2"
                            required={!id}
                        />
                    </div>
                )}

                {/* <input
                    name="latitude"
                    placeholder="Latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    className="w-full border p-2"
                /> */}

                <div>
                    {
                        id ? (<div></div>) : (
                            <div>
                                <p>Address</p>
                                <input
                                    name="address"
                                    placeholder="Address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full border p-2"
                                />
                            </div>
                        )
                    }
                    <div className="mt-5">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-gray-600 cursor-pointer w-full text-white px-4 py-2 rounded"
                        >
                            {loading
                                ? "Saving..."
                                : id
                                    ? "Update Employee"
                                    : "Create Employee"}
                        </button>
                    </div>
                </div>

            </form>
        </section>
    );
};

export default EmployeeForm;
