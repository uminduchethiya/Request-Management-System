// AdminDashboard.jsx

import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";

const AdminDashboard = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/requests');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setRequests(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <AdminLayout>
            <div>
                <html lang="en">
                    <head>
                        <meta charset="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>Admin Dashboard</title>
                    </head>
                    <body>
                        <table className="mt-4 bg-white shadow-md rounded-md overflow-hidden">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th>ID</th>
                                    <th>Created On</th>
                                    <th>Location</th>
                                    <th>Service</th>
                                    <th>Status</th>
                                    <th>Priority</th>
                                    <th>Department</th>
                                    <th>Requested By</th>
                                    <th>Assigned To</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map(request => (
                                    <tr key={request.id}>
                                        <td>{request.id}</td>
                                        <td>{request.created_on}</td>
                                        <td>{request.location}</td>
                                        <td>{request.service}</td>
                                        <td>{request.status}</td>
                                        <td>{request.priority}</td>
                                        <td>{request.department}</td>
                                        <td>{request.requested_by}</td>
                                        <td>{request.assigned_to}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </body>
                </html>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
