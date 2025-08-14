"use client";

import { useQuery, gql } from "@apollo/client";
import { useParams } from "next/navigation";
import Link from "next/link";

const GET_EMPLOYEE_DETAILS = gql`
  query GetEmployeeDetails($id: ID!) {
    getEmployeeDetails(id: $id) {
      id
      name
      position
      department
      salary
    }
  }
`;

export default function EmployeeDetailPage() {
  const params = useParams();
  const { id } = params;

  const { data, loading, error } = useQuery(GET_EMPLOYEE_DETAILS, {
    variables: { id },
  });

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const emp = data.getEmployeeDetails;

  return (
   <main className="max-w-lg mx-auto px-4 py-10 ">
  <div className="relative bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl shadow-lg p-6 overflow-hidden">
    {/* Decorative gradient border */}
    <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 pointer-events-none"></div>

    {/* Avatar */}
    <div className="flex justify-center mb-6">
      <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center text-3xl font-bold text-gray-100">
        {emp.name.charAt(0)}
      </div>
    </div>

    {/* Name */}
    <h1 className="text-3xl text-gray-100  font-bold mb-4 text-center">{emp.name}</h1>

    {/* Info */}
    <div className="space-y-4 text-sm text-gray-100 ">
      <p className="flex items-center gap-2">
        <span className="inline-block w-5 ">💼</span>
        <span>
          <span className="font-semibold">Position:</span> {emp.position}
        </span>
      </p>
      <p className="flex items-center gap-2">
        <span className="inline-block w-5 ">🏢</span>
        <span>
          <span className="font-semibold">Department:</span> {emp.department}
        </span>
      </p>
      <p className="flex items-center gap-2">
        <span className="inline-block w-5 ">💰</span>
        <span>
          <span className="font-semibold">Salary:</span>{" "}
          ${emp.salary.toLocaleString()}
        </span>
      </p>
    </div>
  </div>

  <div className="mt-6 text-center">
    <Link
      href="/"
      className="inline-block text-blue-600 hover:text-blue-800 font-medium"
    >
      ← Back to Home
    </Link>
  </div>
</main>


  );
}
