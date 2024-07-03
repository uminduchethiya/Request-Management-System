import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import axiosClient from "../../utils/axiosClient";
import plus from "../../assets/img/plus.png";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    created_on: "",
    location: "",
    service: "",
    status: "NEW",
    priority: "MEDIUM",
    department: "",
    requested_by: "",
    assigned_to: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axiosClient.get("/requests");
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onDeleteClick = async (request) => {
    try {
      await axiosClient.delete(`/requests/${request.id}`);
      setRequests(requests.filter((r) => r.id !== request.id));
      console.log("Request deleted successfully");
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsEditing(false); // Reset editing state when closing modal
    setSelectedRequestId(null); // Reset selected request ID
    resetFormData(); // Reset form data
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing && selectedRequestId) {
        // Update existing request
        await axiosClient.put(`/requests/${selectedRequestId}`, formData);
        const updatedRequests = requests.map((request) =>
          request.id === selectedRequestId
            ? { ...formData, id: selectedRequestId }
            : request
        );
        setRequests(updatedRequests);
      } else {
        // Create new request
        const response = await axiosClient.post("/requests", formData);
        setRequests([...requests, response.data]);
      }
      setIsModalOpen(false);
      resetFormData();
    } catch (error) {
      console.error(
        isEditing ? "Error updating request:" : "Error creating request:",
        error
      );
    }
  };

  const editRequest = (request) => {
    setSelectedRequestId(request.id);
    setFormData({ ...request });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const resetFormData = () => {
    setFormData({
      created_on: "",
      location: "",
      service: "",
      status: "NEW",
      priority: "MEDIUM",
      department: "",
      requested_by: "",
      assigned_to: "",
    });
  };

  return (
    <AdminLayout>
      <div>
        <html lang="en">
          <head>
            <meta charSet="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <title>Admin Dashboard</title>
          </head>
          <body className=" ">
            <div className="  flex  mb-2  h-48 bg-white w-full ">
              <div className="flex items-center px-10 w-[250px]  ">
                <h1 className=" flex text-2xl   font-bold  ">Requests</h1>
              </div>
              <div className="flex items-center px-10 w-[250px]  ">
                <button
                  className="btn-add bg-[#830823] rounded-md text-white py-2 px-4 w-full flex items-center"
                  onClick={() => {
                    toggleModal();
                  }}
                >
                  <img src={plus} alt="Add" className="mr-2  ml-6 " />{" "}
                  {/* Plus mark image */}
                  Add New
                </button>
              </div>
              <div className="flex justify-between   mt-4">
                <div className="flex flex-col items-center ml-8">
                  <div className="bg-[#FFE2E8] rounded-full h-40 w-40 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold">10</span>
                    <p className="text-lg mt-1">New Requests</p>
                  </div>
                </div>
                <div className="flex flex-col items-center ml-8">
                  <div className="bg-[#CCF5BB] rounded-full h-40 w-40 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold">05</span>
                    <p className="text-lg mt-1">Delayed Requests</p>
                  </div>
                </div>
                <div className="flex flex-col items-center ml-8">
                  <div className="bg-[#D0EEFF] rounded-full h-40 w-40 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold">02</span>
                    <p className="text-lg mt-1">Escalated Requests</p>
                  </div>
                </div>
                <div className="flex flex-col items-center ml-8">
                  <div className="bg-[#D2D4FF] rounded-full h-40 w-40 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold">00</span>
                    <p className="text-lg mt-1">On Hold Requests</p>
                  </div>
                </div>
              </div>
            </div>

            {/* table */}
            <div className=" w-full px-20">
              <table className="mt-10 border  ">
                <thead className="bg-[#C19C27]  ">
                  <tr className="text-white">
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border border-gray-300"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border border-gray-300"
                    >
                      Created On
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border border-gray-300"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border border-gray-300"
                    >
                      Service
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border border-gray-300"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border border-gray-300"
                    >
                      Priority
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border border-gray-300"
                    >
                      Department
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border border-gray-300"
                    >
                      Requested By
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border border-gray-300"
                    >
                      Assigned To
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border border-gray-300"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {requests.map((request) => (
                    <tr key={request.id} className="border border-gray-300">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-300">
                        {request.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-300">
                        {request.created_on}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-300">
                        {request.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-300">
                        {request.service}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-300">
                        {request.status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-300">
                        {request.priority}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-300">
                        {request.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-300">
                        {request.requested_by}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-300">
                        {request.assigned_to}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2 border-r border-gray-300">
                        <button
                          className="btn-edit text-blue-500"
                          onClick={() => editRequest(request)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-delete text-red-500"
                          onClick={() => onDeleteClick(request)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* end table */}
            {isModalOpen && (
              <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div
                    className="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                  >
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  </div>

                  <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>

                  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <form onSubmit={handleSubmit}>
                      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3
                              className="text-lg leading-6 font-medium text-gray-900"
                              id="modal-title"
                            >
                              {isEditing ? "Edit Request" : "Add New Request"}
                            </h3>
                            <div className="mt-2">
                              <input
                                type="date"
                                name="created_on"
                                value={formData.created_on}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                              />
                              <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                placeholder="Location"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                              />
                              <input
                                type="text"
                                name="service"
                                value={formData.service}
                                onChange={handleInputChange}
                                placeholder="Service"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                              />
                              <select
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                              >
                                <option value="NEW">NEW</option>
                                <option value="IN_PROGRESS">IN_PROGRESS</option>
                                <option value="ON_HOLD">ON_HOLD</option>
                                <option value="REJECTED">REJECTED</option>
                                <option value="CANCELLED">CANCELLED</option>
                              </select>
                              <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                              >
                                <option value="HIGH">HIGH</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="LOW">LOW</option>
                              </select>
                              <input
                                type="text"
                                name="department"
                                value={formData.department}
                                onChange={handleInputChange}
                                placeholder="Department"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                              />
                              <input
                                type="text"
                                name="requested_by"
                                value={formData.requested_by}
                                onChange={handleInputChange}
                                placeholder="Requested By"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                              />
                              <input
                                type="text"
                                name="assigned_to"
                                value={formData.assigned_to}
                                onChange={handleInputChange}
                                placeholder="Assigned To"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          {isEditing ? "Update" : "Save"}
                        </button>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                          onClick={toggleModal}
                        >
                          Close
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </body>
        </html>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
