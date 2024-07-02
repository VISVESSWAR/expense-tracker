import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

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

export default function ViewAll({ setMode }) {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleYearSelect = (e) => {
    setYear(e.target.value);
  };

  const handleMonthSelect = (e) => {
    setMonth(e.target.value);
  };

  const handleSearch = () => {
    fetchExpenses();
  };

  const fetchExpenses = async () => {
    const ctg = category === "" ? "all" : category;
    const mon = month === "" ? "all" : month;
    const yr = year === "" ? "all" : year;

    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3001/expense/view/${ctg}/${mon}/${yr}`
      );
      setExpenses(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/expense/delete/${id}`
      );
      if (response.status === 200) {
        toast.success("Successfully removed the expense from the list");
        fetchExpenses();
      } else {
        toast.error("Failed to remove expense from the list");
      }
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const handleEdit = async (id) => {
    setMode("edit");
    navigate(`/edit/${id}`);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear; i >= currentYear - 100; i--) {
    years.push(i);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
      </div>
    );
  } else if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-6 font-extrabold dark:text-dark">
        My Expenses
      </h1>
      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-gray-700 font-bold text-lg"
        >
          Select Category{" "}
        </label>
        <select
          name="category"
          value={category}
          onChange={handleCategoryChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm font-medium"
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
          htmlFor="period"
          className="block text-lg font-bold text-gray-700"
        >
          Specify the month and year{" "}
        </label>
        <div className="flex space-x-4">
          <select
            name="month"
            value={month}
            onChange={handleMonthSelect}
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm font-medium"
          >
            <option value="">-</option>
            {months.map((mo, index) => (
              <option key={index} value={index + 1}>
                {mo}
              </option>
            ))}
          </select>
          <select
            name="year"
            value={year}
            onChange={handleYearSelect}
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm font-medium"
          >
            <option value="">-</option>
            {years.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        onClick={handleSearch}
        className="px-10 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Search
      </button>
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50  text-center text-base font-medium text-gray-500 uppercase tracking-wider">
                Expense Name
              </th>
              <th className="px-6 py-3 bg-gray-50  text-center text-base font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 bg-gray-50  text-center text-base font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 bg-gray-50  text-center text-base font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 bg-gray-50  text-center text-base font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {expenses.length > 0 ? (
              expenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="hover:bg-gray-100 transition duration-150 ease-in-out text-lg "
                >
                  <td className="px-6 py-4 whitespace-nowrap text-lg ">
                    {expense.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg">
                    {expense.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg">
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg">
                    {expense.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(expense.id)}
                      className="py-2 px-3 text-sm text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(expense.id)}
                      className="mx-3 px-3 py-2 text-sm text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="hover:bg-gray-100 transition duration-150 ease-in-out text-lg w-full">
                <td colSpan='5' className="text-lg font-semibold py-12">
                  No expenses tracked!{" "}
                <Link
                  to="/add"
                  className="py-2 px-3 text-sm text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                  Add an expense
                </Link>
                  </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
