export const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    name: String!
    tasks: [Task!]!
    createdAt: String!
    updatedAt: String!
  }

  type Task {
    id: ID!
    title: String!
    content: String
    completed: Boolean!
    dueDate: String
    user: User!
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String!
    userId: ID!
  }

  input CreateTaskInput {
    title: String!
    content: String
    dueDate: String
  }

  input UpdateTaskInput {
    title: String
    content: String
    dueDate: String
    completed: Boolean
  }

  type Query {
    tasks: [Task!]!
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task!
    updateTask(id: ID!, input: UpdateTaskInput!): Task!
    deleteTask(id: ID!): Task!
    login(email: String!, password: String!): AuthPayload!
    register(name: String!, email: String!, password: String!): AuthPayload!
  }
`;
