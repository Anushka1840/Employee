import { gql } from "@apollo/client";

export const ADD_EMPLOYEE = gql`
  mutation AddEmployee(
    $name: String!
    $position: String!
    $department: String!
    $salary: Float!
  ) {
    addEmployee(
      name: $name
      position: $position
      department: $department
      salary: $salary
    ) {
      id
      name
      position
      department
      salary
    }
  }
`;
