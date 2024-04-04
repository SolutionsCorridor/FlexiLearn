import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getAllUsers } from "@/services/admin/admin.service";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            getAllUsers().then((response) => {
                setUsers(response.data);
                console.log("Users:", response.data);
            });
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const columns = [
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
        }
    ];

    return (
        <div className="container mx-auto m-12 space-y-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
            <Table className="w-full">
                <TableHeader className="bg-gray-100">
                    <TableRow key="header">
                        {columns.map((column) => (
                            <TableHead key={column.key}>{column.title}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody className="divide-y">
                    {users.map((user, index) => (
                        <TableRow key={index} className="hover:bg-gray-50">
                            <TableCell>
                                {user.userDetails && (
                                    <img
                                        className="w-16 h-16 rounded-full"
                                        src={user.userDetails.profileImage}
                                        alt={user.userDetails.fullName}
                                    />
                                ) || '-'}
                            </TableCell>
                            <TableCell>{user.userDetails && user.userDetails.fullName || '-'}</TableCell>
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
        </div>
    )
}

export default Dashboard