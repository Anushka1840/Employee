const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");

const resolvers = {
    Query: {
        getAllEmployees: async () => {
            const db = getDB();
            const employees = await db.collection("employees")
                .find()
                .project({ name: 1, position: 1, department: 1, salary: 1 }) // include fields you need
                .toArray();

            return employees.map(e => ({
                id: e._id.toString(),
                name: e.name,
                position: e.position,
                department: e.department,
                salary: e.salary,
            }));
        },

        getEmployeeDetails: async (_, { id }) => {
            const db = getDB();
            const e = await db.collection("employees").findOne({ _id: new ObjectId(id) });
            if (!e) return null;
            return {
                id: e._id.toString(),
                name: e.name,
                position: e.position,
                department: e.department,
                salary: e.salary,
            };
        },

        getEmployeesByDepartment: async (_, { department }) => {
            const db = getDB();
            const employees = await db.collection("employees")
                .find({ department })
                .toArray();

            return employees.map(e => ({
                id: e._id.toString(),
                name: e.name,
                position: e.position,
                department: e.department,
                salary: e.salary,
            }));
        },

        getTheFloor: async () => {
            const db = getDB();
            const departments = await db.collection("departments").find().toArray();
            return departments.map(d => ({
                id: d._id.toString(),
                name: d.name,
                floor: d.floor,
            }));
        },
    },

    Mutation: {
        addEmployee: async (_, { name, position, department, salary }) => {
            const db = getDB();
            const result = await db.collection("employees").insertOne({
                name,
                position,
                department,
                salary,
            });
            return {
                id: result.insertedId.toString(),
                name,
                position,
                department,
                salary,
            };
        },
    },
};

module.exports = resolvers;
