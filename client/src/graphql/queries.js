import { gql } from "@apollo/client";

export const GET_PERSON = gql`
  {
    persons {
      id
      firstName
      lastName
    }
  }
`;

export const GET_CAR_BY_PERSON = gql`
  query PersonCars($personId: String!) {
    personCars(personId: $personId) {
      id
      year
      make
      model
      price
    }
  }
`;

export const ADD_PERSON = gql`
  mutation AddPerson($id: String!, $firstName: String!, $lastName: String!) {
    addPerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

export const REMOVE_PERSON = gql`
  mutation RemovePerson($id: String!) {
    removePerson(id: $id) {
      id
    }
  }
`;

export const REMOVE_CAR = gql`
  mutation RemoveCar($id: String!) {
    removeCar(id: $id) {
      id
    }
  }
`;
