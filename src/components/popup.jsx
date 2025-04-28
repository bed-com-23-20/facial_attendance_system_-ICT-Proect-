import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationForm = ({ closeForm }) => {
  const navigate = useNavigate(); // Use the useNavigate hook for navigation
  const [formData, setFormData] = useState({
    examName: "",
    room: "",
    invigilatorName: "",
    startTime: "",
    endTime: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate all fields
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      alert("Form submitted successfully!");
      closeForm();
      // Navigate to the enrollment page with state
      navigate("/enrollmentPage", {
        state: {
          examName: formData.examName,
          room: formData.room,
          invigilatorName: formData.invigilatorName,
          startTime: formData.startTime,
          endTime: formData.endTime,
        },
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      examName: "",
      room: "",
      invigilatorName: "",
      startTime: "",
      endTime: "",
    });
    setErrors({});
    closeForm();
  };

  return (
    <div className="absolute left-[35%] bg-gray-100 font-sans p-5 border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-center mb-6">Examination Registration</h1>
      <p className="text-center text-gray-600 mb-4">
        Please fill in the details below to register for the examination.
      </p>
      <form
        className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            htmlFor="examName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Examination Name
          </label>
          <input
            type="text"
            id="examName"
            name="examName"
            value={formData.examName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.examName ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500`}
          />
          {errors.examName && (
            <p className="text-red-500 text-sm mt-1">{errors.examName}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="room"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Room
          </label>
          <input
            type="text"
            id="room"
            name="room"
            value={formData.room}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.room ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500`}
          />
          {errors.room && (
            <p className="text-red-500 text-sm mt-1">{errors.room}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="invigilatorName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Invigilator Name
          </label>
          <input
            type="text"
            id="invigilatorName"
            name="invigilatorName"
            value={formData.invigilatorName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.invigilatorName ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500`}
          />
          {errors.invigilatorName && (
            <p className="text-red-500 text-sm mt-1">{errors.invigilatorName}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="startTime"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Start Time
          </label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.startTime ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500`}
          />
          {errors.startTime && (
            <p className="text-red-500 text-sm mt-1">{errors.startTime}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="endTime"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            End Time
          </label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.endTime ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500`}
          />
          {errors.endTime && (
            <p className="text-red-500 text-sm mt-1">{errors.endTime}</p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="w-full py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
