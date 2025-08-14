"use client";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GET_ALL_EMPLOYEES_AND_FLOORS } from "../graphql/queries";

// TypeScript types
type Employee = {
  id: string;
  name: string;
  position: string;
  department: string;
  salary: number;
};

type Department = {
  name: string;
  floor: number;
};

export default function HomePage() {
  const { data, loading, error } = useQuery(GET_ALL_EMPLOYEES_AND_FLOORS);
  const router = useRouter();
  const [selectedDepartment, setSelectedDepartment] = useState("");

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error.message}</p>;

  // Create department -> floor lookup
  const floorMap = (data.getTheFloor as Department[]).reduce(
    (acc: Record<string, number>, dept) => {
      acc[dept.name] = dept.floor;
      return acc;
    },
    {}
  );

  // Filter employees based on selected department
  const filteredEmployees = selectedDepartment
    ? (data.getAllEmployees as Employee[]).filter(
        (emp) => emp.department === selectedDepartment
      )
    : (data.getAllEmployees as Employee[]);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold dark:text-gray-100 mb-6">Employee Directory</h1>

      {/* Department Filter */}
      <div className="mb-6">
        <label
          htmlFor="department"
          className="dark:text-gray-100 block text-sm font-medium mb-1"
        >
          Filter by Department
        </label>
        <select
          id="department"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="w-full border dark:text-gray-100 border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option className="dark:bg-gray-900" value="">
            All Departments
          </option>
          {(data.getTheFloor as Department[]).map((dept) => (
            <option
              className="dark:bg-gray-900"
              key={dept.name}
              value={dept.name}
            >
              {dept.name}
            </option>
          ))}
        </select>
      </div>

      {/* Add Employee Button */}
      <div className="mb-6">
        <Link
          href="/addEmployee"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded shadow transition-colors"
        >
          + Add New Employee
        </Link>
      </div>

      {/* Employee Table */}
      <div className="overflow-x-auto border dark:text-gray-100 rounded">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 dark:text-gray-900">
              <th className="text-left px-4 py-2 font-medium">Name</th>
              <th className="text-left px-4 py-2 font-medium">Position</th>
              <th className="text-left px-4 py-2 font-medium">Department</th>
              <th className="text-left px-4 py-2 font-medium">Floor</th>
              <th className="text-left px-4 py-2 font-medium">Salary</th>
            </tr>
          </thead>
          <tbody>
            {(filteredEmployees as Employee[]).map((emp) => (
              <tr
                key={emp.id}
                onClick={() => router.push(`/employee/${emp.id}`)}
                onKeyDown={(e) =>
                  e.key === "Enter" && router.push(`/employee/${emp.id}`)
                }
                tabIndex={0}
                className="cursor-pointer border-t hover:bg-gray-200 dark:hover:bg-gray-900 dark:focus:bg-gray-600 focus:bg-gray-400 transition"
              >
                <td className="px-4 py-2">{emp.name}</td>
                <td className="px-4 py-2">{emp.position}</td>
                <td className="px-4 py-2">{emp.department}</td>
                <td className="px-4 py-2">
                  {floorMap[emp.department] ?? "N/A"}
                </td>
                <td className="px-4 py-2">
                  ${emp.salary.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
