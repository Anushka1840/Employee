// seed.js
const { MongoClient } = require("mongodb");
require("dotenv").config();

(async () => {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    const db = client.db("employeeDirectory");

    // Clean up collections
    await db.collection("employees").deleteMany();
    await db.collection("departments").deleteMany();

    // Insert Departments
    const departments = [
        { name: "Engineering", floor: 5 },
        { name: "Design", floor: 3 },
        { name: "HR", floor: 2 },
    ];

    const deptResult = await db.collection("departments").insertMany(departments);
    console.log(`✅ Inserted ${deptResult.insertedCount} departments`);

    // Insert Employees
    const employees = [
        {
            name: "Alice",
            position: "Engineer",
            department: "Engineering",
            salary: 75000,
        },
        {
            name: "Bob",
            position: "Designer",
            department: "Design",
            salary: 68000,
        },
        {
            name: "Charlie",
            position: "Manager",
            department: "HR",
            salary: 85000,
        },
        {
            name: "David",
            position: "Engineer",
            department: "Engineering",
            salary: 78000,
        },
        {
            name: "Eva",
            position: "Recruiter",
            department: "HR",
            salary: 60000,
        },
    ];

    const empResult = await db.collection("employees").insertMany(employees);
    console.log(`✅ Inserted ${empResult.insertedCount} employees`);

    await client.close();
    console.log("🌱 Seeding completed.");
})();
