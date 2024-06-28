import find from "lodash.find";
import remove from "lodash.remove";
import filter from "lodash.filter";
import { people, cars } from "./peopleCarsScheme";

const typeDefs = `
    type Person {
      id: String!
      firstName: String
      lastName: String
    }

    type Car {
      id: String!
      year: String
      make: String
      model: String
      price: String
      personId: String
    }

    type PersonWithCars {
      id: String!
      firstName: String
      lastName: String
      cars: [Car]
    }
  
    type Query {
      person(id: String!): Person
      persons: [Person]
      car(id: String!): Car
      cars: [Car]
      personCars(personId: String!): [Car]
      personWithCars(id: String!): PersonWithCars
    }
  
    type Mutation {
      addPerson(id: String!, firstName: String!, lastName: String!): Person
      updatePerson(id: String!, firstName: String!, lastName: String!): Person
      removePerson(id: String!): Person
      removeCar(id: String!): Car
      addCar(id: String!, year: String!, make: String!, model: String!, price: String!, personId: String!): Car
      updateCar(id: String!, year: String!, make: String!, model: String!, price: String!, personId: String!): Car
    }
  `;

const resolvers = {
  Query: {
    persons: () => people,
    person(root, args) {
      return find(people, { id: args.id });
    },
    cars: () => cars,
    car(root, args) {
      return find(cars, { id: args.id });
    },
    personCars(root, args) {
      return filter(cars, { personId: args.personId });
    },
    personWithCars(root, args) {
      const person = find(people, { id: args.id });
      if (!person) {
        throw new Error(`Person with id ${args.id} not found`);
      }

      const personCars = filter(cars, { personId: args.id });

      return {
        ...person,
        cars: personCars,
      };
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
    removeCar: (root, args) => {
      const removedCar = find(cars, { id: args.id });

      if (!removedCar) {
        throw Error(`Couldn\'t find car with id ${args.id}`);
      }

      remove(cars, (c) => {
        return c.id == removedCar.id;
      });

      return removedCar;
    },
    addCar: (root, args) => {
      const newCar = {
        id: args.id,
        year: args.year,
        make: args.make,
        model: args.model,
        price: args.price,
        personId: args.personId,
      };

      cars.push(newCar);

      return newCar;
    },
    updateCar: (root, args) => {
      const car = find(cars, { id: args.id });

      if (!car) {
        throw Error(`Couldn\'t find car with id ${args.id}`);
      }

      car.year = args.year;
      car.make = args.make;
      car.model = args.model;
      car.price = args.price;
      car.personId = args.personId;
    },
  },
};

export { typeDefs, resolvers };
