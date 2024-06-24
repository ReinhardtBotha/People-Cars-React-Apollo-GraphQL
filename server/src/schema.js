import find from "lodash.find";
import remove from "lodash.remove";
import { people, cars } from "./peopleCarsScheme";

const typeDefs = `
    type Person {
      id: String!
      firstName: String
      lastName: String
    }
  
    type Query {
      person(id: String!): Person
      persons: [Person]
    }
  
    type Mutation {
      addPerson(id: String!, firstName: String!, lastName: String!): Person
      updatePerson(id: String!, firstName: String!, lastName: String!): Person
      removePerson(id: String!): Person
    }
  `;

const resolvers = {
  Query: {
    persons: () => people,
    person(root, args) {
      return find(people, { id: args.id });
    },
  },
  Mutation: {
    addPerson: (root, args) => {
      const newPerson = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName,
      };

      people.push(newPerson);

      return newPerson;
    },
    updatePerson: (root, args) => {
      const person = find(people, { id: args.id });

      if (!person) {
        throw Error(`Couldn\'t find person with id ${args.id}`);
      }

      person.firstName = args.firstName;
      person.lastName = args.lastName;

      return person;
    },
    removePerson: (root, args) => {
      const removedPerson = find(people, { id: args.id });

      if (!removedPerson) {
        throw Error(`Couldn\'t find person with id ${args.id}`);
      }

      remove(people, (c) => {
        return c.id == removedPerson.id;
      });

      return removedPerson;
    },
  },
};

export { typeDefs, resolvers };
