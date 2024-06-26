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
      year
      make
      model
      price
    }
  }
`;

export const ADD_PERSON = gql`
  mutation AddContact($id: String!, $firstName: String!, $lastName: String!) {
    addContact(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;
