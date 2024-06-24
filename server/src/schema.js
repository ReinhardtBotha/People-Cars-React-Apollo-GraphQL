const contactsArray = [
  {
    id: "1",
    firstName: "Paul",
    lastName: "Lam",
  },
  {
    id: "2",
    firstName: "John",
    lastName: "Smith",
  },
  {
    id: "3",
    firstName: "Jane",
    lastName: "Doe",
  },
];

const typeDefs = `
    type Contact {
      id: String!
      firstName: String
      lastName: String
    }
  
    type Query {
      contact(id: String!): Contact
      contacts: [Contact]
    }
  
    type Mutation {
      addContact(id: String!, firstName: String!, lastName: String!): Contact
      updateContact(id: String!, firstName: String!, lastName: String!): Contact
      removeContact(id: String!): Contact
    }
  `;

const resolvers = {
  Query: {
    contacts: () => contactsArray,
  },
};

export { typeDefs, resolvers };
