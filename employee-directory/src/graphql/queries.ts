import { gql } from "@apollo/client";

export const GET_ALL_EMPLOYEES_AND_FLOORS = gql`
  query GetAllEmployeesAndFloors {
    getAllEmployees {
      id
      name
      position
      department
      salary
    }
    getTheFloor {
      name
      floor
    }
  }
`;
