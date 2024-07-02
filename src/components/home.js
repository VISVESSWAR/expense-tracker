import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export default function Home({ mode, setMode }) {
  const [category, setCategory] = useState("");
  const categories = [
    {
      value: "Housing",
      label: "Housing - Rent/Mortgage, Property Taxes, Insurance, Maintenance",
    },
    {
      value: "Utilities",
      label: "Utilities - Electricity, Gas, Water, Internet, Phone",
    },
    {
      value: "Transportation",
      label:
        "Transportation - Fuel, Car Maintenance, Public Transport, Parking, Car Insurance",
    },
    { value: "Food", label: "Food - Groceries, Dining out, Coffee Shops" },
    {
      value: "HealthCare",
      label:
        "HealthCare - Insurance Premiums, Doctor Visits, Medications, Dental Care",
    },
    {
      value: "Personal Care",
      label: "Personal Care - Haircuts, Skincare, Gym Memberships",
    },
    {
      value: "Entertainment",
      label: "Entertainment - Movies, Concerts, Hobbies, Subscriptions",
    },
    { value: "Education", label: "Education - Tuition, Books, Courses" },
    { value: "Clothing", label: "Clothing - Apparel, Shoes, Accessories" },
    {
      value: "Savings and Investments",
      label:
        "Savings and Investments - Retirement Accounts, Savings Accounts, Investments",
    },
    { value: "Debt", label: "Debt - Loan Payments, Credit Card Payments" },
    {
      value: "Travel",
      label: "Travel - Flights, Accommodation, Travel Insurance",
    },
    {
      value: "Business",
      label:
        "Business - Office Supplies, Business Travel, Professional Development",
    },
    {
      value: "Miscellaneous",
      label: "Miscellaneous - Gifts, Donations, Unforeseen Expenses",
    },
  ];

  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    date: "",
    amount: 0,
  });

  useEffect(() => {
    if (mode === "edit" && id) {
      const fetchExpenseDetails = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/expense/details/${id}`
          );
          if (response.status === 200) {
            const formattedDate = new Date(response.data.date)
              .toISOString()
              .split("T")[0];
            setFormData({ ...response.data, date: formattedDate });
            console.log(response.data);
          } else {
            toast.error("Failed to fetch expense details");
          }
          setLoading(false);
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      };
      fetchExpenseDetails();
    } else {
      setLoading(false);
      setFormData({
        name: "",
        category: "",
        date: "",
        amount: 0,
      });
    }
  }, [mode, id]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      category: e.target.value,
    }));
  };

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const checkSubmit = async (e) => {
    e.preventDefault();
    if (formData.amount <= 0) {
      toast.error("Enter an amount greater than 0");
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      let response;
      if (mode === "edit") {
        response = await axios.post(
          `http://localhost:3001/expense/edit/${id}`,
          formData
        );
      } else {
        response = await axios.post(
          "http://localhost:3001/expense/add",
          formData
        );
      }

      if (response.status === 200) {
        setFormData({
          name: "",
          category: "",
          date: "",
          amount: 0,
        });
        toast.success(
          mode === "edit"
            ? "Expense updated successfully!"
            : "New expense tracked!"
        );
        if (mode === "edit") {
          setMode("add");
        }
        navigate("/");
      } else {
        console.error("Error submitting the form");
      }
    } catch (err) {
      console.error("Error submitting the form:", err);
    }
  };

  if (loading) {
    return <h1 className="m-8">Loading...</h1>;
  } else if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md ">
        <h1 className="text-3xl my-9 font-bold dark:text-dark">
          {mode === "edit" ? "Edit Expense" : "Add Expense"}
        </h1>
        <form onSubmit={checkSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-base font-bold text-gray-700"
            >
              Expense Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Expense name"
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-base font-bold text-gray-700"
            >
              Category of expense
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleCategoryChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">none</option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-base font-bold text-gray-700"
            >
              Date of Expense
            </label>
            <input
              required
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-base font-bold text-gray-700"
            >
              Expense Amount
            </label>
            <input
              type="number"
              name="amount"
              required
              value={formData.amount}
              placeholder="Enter the amount"
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {mode === "edit" ? "Edit" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
}
