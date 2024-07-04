import React, { useState, useEffect } from "react";
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
  const [validationErrors, setValidationErrors] = useState({
    created_on: false,
    location: false,
    service: false,
    department: false,
    requested_by: false,
  });

  useEffect(() => {
    fetchRequests();
  }, []);

  // Fetch requests from API
  const fetchRequests = async () => {
    try {
      const response = await axiosClient.get("/requests");
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle delete request
  const onDeleteClick = async (request) => {
    try {
      await axiosClient.delete(`/requests/${request.id}`);
      setRequests(requests.filter((r) => r.id !== request.id));
      console.log("Request deleted successfully");
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  // Toggle modal for add/edit request
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsEditing(false); // Reset editing state when closing modal
    setSelectedRequestId(null); // Reset selected request ID
    resetFormData(); // Reset form data
  };

  // Handle input change in form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission (create/update request)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    let valid = true;
    let errors = {
      created_on: false,
      location: false,
      service: false,
      department: false,
      requested_by: false,
    };
    if (!formData.created_on) {
      errors.created_on = true;
      valid = false;
    }
    if (!formData.location) {
      errors.location = true;
      valid = false;
    }
    if (!formData.service) {
      errors.service = true;
      valid = false;
    }
    if (!formData.department) {
      errors.department = true;
      valid = false;
    }
    if (!formData.requested_by) {
      errors.requested_by = true;
      valid = false;
    }

    setValidationErrors(errors);

    if (!valid) {
      return;
    }

    try {
      let updatedRequest;
      if (isEditing && selectedRequestId) {
        // Update existing request
        await axiosClient.put(`/requests/${selectedRequestId}`, formData);
        updatedRequest = { ...formData, id: selectedRequestId };
      } else {
        // Create new request
        const response = await axiosClient.post("/requests", formData);
        updatedRequest = response.data;
      }

      const updatedRequests = requests.map((request) =>
        request.id === updatedRequest.id ? updatedRequest : request
      );
      setRequests(updatedRequests);

      setIsModalOpen(false);
      resetFormData();
    } catch (error) {
      console.error(
        isEditing ? "Error updating request:" : "Error creating request:",
        error
      );
    }
  };

  // Edit request - populate form for editing
  const editRequest = (request) => {
    setSelectedRequestId(request.id);
    setFormData({ ...request });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Reset form data and validation errors
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
    setValidationErrors({
      created_on: false,
      location: false,
      service: false,
      department: false,
      requested_by: false,
    });
  };

  // Function to get status color class based on status
  const getStatusColorClass = (status) => {
    switch (status) {
      case "NEW":
        return "bg-[#FFF1AC]";
      case "IN_PROGRESS":
        return "bg-[#E1F5E7]";
      case "ON_HOLD":
        return "bg-[EAEAFF]";
      case "REJECTED":
        return "bg-[#FAE1E1]"; // Changed to orange background
      case "CANCELLED":
        return "bg-[#FFE9D4]";
      default:
        return ""; // Default case, if none of the above cases match
    }
  };
  
  const getPriorityColorClass = (priority) => {
    switch (priority) {
      case "LOW":
        return "bg-[#58C42B]";
      case "MEDIUM":
        return "bg-[#FFD261]";
      case "HIGH":
        return "bg-[#DCD9D9]";
      default:
        return ""; // Default case, if none of the above cases match
    }
  };

  return (
    <AdminLayout>
      <div className="w-full">
        {/* Request header */}
        <div className="flex mb-2 h-48 bg-white w-full">
          <div className="flex items-center px-10 w-80">
            <h1 className="text-2xl font-bold">Requests</h1>
          </div>
          <div className="flex items-center px-10 w-80">
            <button
              className="btn-add bg-[#830823] rounded-md text-white py-2 px-4  flex items-center"
              onClick={toggleModal}
            >
              <img src={plus} alt="Add" className="mr-2 " />
              Add New
            </button>
          </div>
          <div className="flex justify-between mt-4">
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
        {/* End request header */}

        {/* Table */}
        <div className="w-full flex justify-center mt-10">
          <div className="">
            <table className="min-w-full border">
              <thead className="bg-[#C19C27] text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border border-gray-300">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border border-gray-300">
                    Created On
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border border-gray-300">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border border-gray-300">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border border-gray-300">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border border-gray-300">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border border-gray-300">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border border-gray-300">
                    Requested By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border border-gray-300">
                    Assigned To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border border-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request) => (
                  <tr key={request.id}>
                    <td className="px-6 py-4 whitespace-nowrap border border-gray-300 text-sm">
                      {request.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border border-gray-300 text-sm">
                      {request.created_on}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border border-gray-300 text-sm">
                      {request.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border border-gray-300 text-sm">
                      {request.service}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap border border-gray-300 text-sm ${getStatusColorClass(
                        request.status
                      )}`}
                    >
                      {request.status}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap border border-gray-300 text-sm ${getPriorityColorClass(request.priority)}`}>
                        {request.priority}
                      </td>
                    <td className="px-6 py-4 whitespace-nowrap border border-gray-300 text-sm">
                      {request.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border border-gray-300 text-sm">
                      {request.requested_by}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border border-gray-300 text-sm">
                      {request.assigned_to}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border border-gray-300 text-sm">
                      <div className="flex space-x-2">
                        <button
                          className="text-blue-500"
                          onClick={() => editRequest(request)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-500"
                          onClick={() => onDeleteClick(request)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* End table */}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div
              className="bg-white p-8 rounded-lg z-10 transform transition-all duration-300 ease-in-out"
              style={{ transform: isModalOpen ? "scale(1)" : "scale(0.8)" }}
            >
              <h2 className="text-2xl font-bold mb-4">
                {isEditing ? "Edit Request" : "Add New Request"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1">Created On</label>
                    <input
                      type="date"
                      name="created_on"
                      value={formData.created_on}
                      onChange={handleInputChange}
                      className={`border rounded p-2 w-full ${
                        validationErrors.created_on ? "border-red-500" : ""
                      }`}
                    />
                    {validationErrors.created_on && (
                      <span className="text-red-500 text-sm">
                        Created On is required
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block mb-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className={`border rounded p-2 w-full ${
                        validationErrors.location ? "border-red-500" : ""
                      }`}
                    />
                    {validationErrors.location && (
                      <span className="text-red-500 text-sm">
                        Location is required
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block mb-1">Service</label>
                    <input
                      type="text"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className={`border rounded p-2 w-full ${
                        validationErrors.service ? "border-red-500" : ""
                      }`}
                    />
                    {validationErrors.service && (
                      <span className="text-red-500 text-sm">
                        Service is required
                      </span>
                    )}
                  </div>
                  <div className="text-sm">
                    <label className="block mb-1">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="border rounded p-2 w-full text-sm"
                    >
                      <option value="NEW">New</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="ON_HOLD">On Hold</option>
                      <option value="REJECTED">Rejected</option>
                      <option value="CANCELLED">Cancel</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1">Priority</label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="border rounded p-2 w-full"
                    >
                      <option value="LOW">Low</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HIGH">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1">Department</label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className={`border rounded p-2 w-full ${
                        validationErrors.department ? "border-red-500" : ""
                      }`}
                    />
                    {validationErrors.department && (
                      <span className="text-red-500 text-sm">
                        Department is required
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block mb-1">Requested By</label>
                    <input
                      type="text"
                      name="requested_by"
                      value={formData.requested_by}
                      onChange={handleInputChange}
                      className={`border rounded p-2 w-full ${
                        validationErrors.requested_by ? "border-red-500" : ""
                      }`}
                    />
                    {validationErrors.requested_by && (
                      <span className="text-red-500 text-sm">
                        Requested By is required
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block mb-1">Assigned To</label>
                    <input
                      type="text"
                      name="assigned_to"
                      value={formData.assigned_to}
                      onChange={handleInputChange}
                      className="border rounded p-2 w-full"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                    onClick={toggleModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#830823] text-white py-2 px-4 rounded"
                  >
                    {isEditing ? "Update" : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* End modal */}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
