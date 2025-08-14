const typeDefs = `#graphql
  type Employee {
    id: ID!
    name: String!
    position: String!
    department: String!
    salary: Float!
  }
type Department {
  id: ID!
  name: String!
  floor: Int!
}
  type Query {
    getAllEmployees: [Employee!]!
    getEmployeeDetails(id: ID!): Employee
    getEmployeesByDepartment(department: String!): [Employee!]!
    getTheFloor: [Department!]!
  }

  type Mutation {
    addEmployee(
      name: String!
      position: String!
      department: String!
      salary: Float!
    ): Employee
  }
`;

module.exports = typeDefs;
