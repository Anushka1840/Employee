"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useMutation } from "@apollo/client";
import { ADD_EMPLOYEE } from "../../graphql/mutations";
import { GET_ALL_EMPLOYEES_AND_FLOORS } from "../../graphql/queries";

// Define schema
const EmployeeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  position: z.string().min(1, "Position is required"),
  department: z.enum(["Engineering", "Design", "HR"]),
  salary: z.number().nonnegative("Salary must be positive"),
});

// Infer TypeScript type from schema
type EmployeeFormData = z.infer<typeof EmployeeSchema>;

export default function AddEmployeePage() {
  const router = useRouter();

  // Type the form state
  const [form, setForm] = useState<{
    name: string;
    position: string;
    department: string;
    salary: string;
  }>({
    name: "",
    position: "",
    department: "",
    salary: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [addEmployee, { loading }] = useMutation(ADD_EMPLOYEE);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedForm: EmployeeFormData = {
      name: form.name,
      position: form.position,
      department: form.department as EmployeeFormData["department"],
      salary: Number(form.salary), // Convert salary to number
    };

    // Validate
    const result = EmployeeSchema.safeParse(parsedForm);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        const key = issue.path[0];
        if (key !== undefined) {
          fieldErrors[String(key)] = issue.message;
        }
      });

      setErrors(fieldErrors);
      return;
    }

    try {
      await addEmployee({
        variables: {
          name: result.data.name,
          position: result.data.position,
          department: result.data.department,
          salary: result.data.salary,
        },
        refetchQueries: [{ query: GET_ALL_EMPLOYEES_AND_FLOORS }],
        awaitRefetchQueries: true,
      });

      // ✅ On success, redirect to home
      router.push("/");
    } catch (err) {
      console.error("Mutation error:", err);
    }
  };

  return (
    <main className="max-w-lg mx-auto px-4 py-10">
      <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl shadow p-6 transition-colors">
        <h1 className="text-2xl font-bold mb-6 text-center  dark:text-gray-100">
          Add New Employee
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-100">
              Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`w-full rounded px-3 py-2 border focus:outline-none focus:ring-2
                ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500 dark:border-neutral-600"
                }
                dark:bg-neutral-800 dark:text-white
              `}
              placeholder="Enter full name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-100">
              Position
            </label>
            <input
              name="position"
              value={form.position}
              onChange={handleChange}
              className={`w-full rounded px-3 py-2 border focus:outline-none focus:ring-2
                ${
                  errors.position
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500 dark:border-neutral-600"
                }
                dark:bg-neutral-800 dark:text-white
              `}
              placeholder="Enter position"
            />
            {errors.position && (
              <p className="text-red-500 text-sm mt-1">{errors.position}</p>
            )}
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium mb-1  dark:text-gray-100">
              Department
            </label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              className={`w-full rounded px-3 py-2 border focus:outline-none focus:ring-2
                ${
                  errors.department
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500 dark:border-neutral-600"
                }
                dark:bg-neutral-800 dark:text-white
              `}
            >
              <option value="">Select Department</option>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="HR">HR</option>
            </select>
            {errors.department && (
              <p className="text-red-500 text-sm mt-1">{errors.department}</p>
            )}
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-100">
              Salary
            </label>
            <input
              name="salary"
              type="number"
              min="0"
              value={form.salary}
              onChange={handleChange}
              className={`w-full rounded px-3 py-2 border focus:outline-none focus:ring-2
                ${
                  errors.salary
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500 dark:border-neutral-600"
                }
                dark:bg-neutral-800 dark:text-white
              `}
              placeholder="Enter salary"
            />
            {errors.salary && (
              <p className="text-red-500 text-sm mt-1">{errors.salary}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded shadow transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save Employee"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:underline"
          >
            ← Cancel and go back
          </button>
        </div>
      </div>
    </main>
  );
}
