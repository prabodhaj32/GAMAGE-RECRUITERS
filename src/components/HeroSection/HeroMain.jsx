import React, { useState, useEffect } from "react";
import axios from "axios";

const HeroMain = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    age: "",
    status: "Active",
  });

  // State for managing students
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Fetch users from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/users");
        setStudents(response.data); // Assuming the response is an array of users
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId !== null) {
      // Update existing student
      setStudents(
        students.map((student, index) =>
          index === editingId ? { ...formData } : student
        )
      );
      setEditingId(null);
    } else {
      // Add new student
      setStudents([...students, formData]);
    }

    // Clear form
    setFormData({ name: "", image: "", age: "", status: "Active" });
  };

  // Handle edit action
  const handleEdit = (index) => {
    setFormData(students[index]);
    setEditingId(index);
  };

  // Handle delete action
  const handleDelete = (index) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold mb-6">Student Management</h1>

      {/* Student Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md rounded-lg w-96 mb-6"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editingId !== null ? "Edit Student" : "Add Student"}
        </h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded"
        >
          {editingId !== null ? "Update Student" : "Add Student"}
        </button>
      </form>

      {/* Student List - Table Design */}
      <div className="w-full max-w-2xl">
        {students.length > 0 && (
          <table className="min-w-full bg-white p-4 shadow-md rounded-lg">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-2 px-4">Profile</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Age</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                  }`}
                >
                  <td className="py-2 px-4">
                    <img
                      src={student.image || "https://via.placeholder.com/150"}
                      alt={student.name}
                      className="w-12 h-12 rounded-full"
                    />
                  </td>
                  <td className="py-2 px-4 font-semibold">{student.name}</td>
                  <td className="py-2 px-4">{student.age}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`${
                        student.status === "Active"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-blue-500 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default HeroMain;
