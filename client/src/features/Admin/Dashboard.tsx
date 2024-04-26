import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllUsers } from "@/services/admin/admin.service";

interface User {
    _id: string;
    email: string;
    role: string;
    status: string;
    userDetails: {
        fullName: string;
        profileImage: string;
    };
}

const Dashboard = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [filter, setFilter] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [usersPerPage, setUsersPerPage] = useState<number>(5);

    useEffect(() => {
        fetchUsers();
    }, [currentPage, usersPerPage, filter]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await getAllUsers(currentPage, usersPerPage, filter);
            setUsers(response.data);
            console.log(users)
            setLoading(false);
        } catch (error) {
            console.error("Error fetching users:", error);
            setLoading(false);
        }
    };

    const handleFilter = (role: string) => {
        setFilter(role);
        setCurrentPage(1); // Reset current page when applying filter
    };

    const filteredUsers = filter ? users.filter(user => user.role === filter) : users;

    const indexOfLastUser = Math.min(currentPage * usersPerPage, filteredUsers.length);
    const indexOfFirstUser = Math.min((currentPage - 1) * usersPerPage + 1, indexOfLastUser);
    const currentUsers = filteredUsers.slice(indexOfFirstUser - 1, indexOfLastUser);

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const paginationNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        paginationNumbers.push(
            <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`px-3 py-1 text-blue-600 rounded-md focus:outline-none ${currentPage === i ? 'bg-blue-200' : ''}`}
            >
                {i}
            </button>
        );
    }

    return (
        <div className="container mx-auto m-12 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
            <div className="flex space-x-4 mb-4">
                <button onClick={() => handleFilter("student")} className={`px-4 py-2 text-blue-500 border border-blue-500 rounded-md focus:outline-none ${filter === "student" ? "bg-blue-100" : ""}`}>Students</button>
                <button onClick={() => handleFilter("teacher")} className={`px-4 py-2 text-blue-500 border border-blue-500 rounded-md focus:outline-none ${filter === "teacher" ? "bg-blue-100" : ""}`}>Teachers</button>
                <button onClick={() => handleFilter("parent")} className={`px-4 py-2 text-blue-500 border border-blue-500 rounded-md focus:outline-none ${filter === "parent" ? "bg-blue-100" : ""}`}>Parents</button>
            </div>
            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <>
                    <Table className="w-full">
                        <TableHeader className="bg-gray-100">
                            <TableRow key="header">
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y">
                            {currentUsers.map((user, index) => (
                                <TableRow key={index} className="hover:bg-gray-50">
                                    {user.userDetails ? (
                                        <>
                                            <TableCell>
                                                <img
                                                    className="w-16 h-16 rounded-full"
                                                    src={user.userDetails.profileImage}
                                                    alt={user.userDetails.fullName}
                                                />
                                            </TableCell>
                                            <TableCell>{user.userDetails.fullName}</TableCell>
                                        </>
                                    ) : (
                                        <>
                                            <TableCell>-</TableCell>
                                            <TableCell>-</TableCell>
                                        </>
                                    )}
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>{user.status}</TableCell>
                                    <TableCell>
                                        <Link to={`/${user.role}/${user._id}`}>
                                            <button className="px-4 py-2 text-white bg-blue-500 rounded-md">See More</button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="flex justify-end m-4">
                        <div className="text-sm text-gray-500">{`Showing ${indexOfFirstUser} to ${indexOfLastUser} of ${filteredUsers.length} entries`}</div>
                        <div className="flex space-x-2">
                            <span className="text-sm text-gray-500">Show:</span>
                            <select
                                value={usersPerPage}
                                onChange={(e) => setUsersPerPage(Number(e.target.value))}
                                className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none"
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                            </select>
                        </div>
                        <div className="flex space-x-2">
                            {paginationNumbers}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Dashboard;
