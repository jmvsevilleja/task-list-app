import chai, { expect } from "chai";
import sinon from "sinon";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "../graphql/schema";
import { resolvers } from "../graphql/resolvers";
import { PrismaClient } from "@prisma/client";

describe("GraphQL Auth Tests", () => {
  let testServer: ApolloServer;
  let prisma: PrismaClient;
  let url: string;

  before(async () => {
    // Create test Apollo Server
    testServer = new ApolloServer({
      typeDefs,
      resolvers,
    });

    // Mock Prisma client
    prisma = new PrismaClient();
    const { url: serverUrl } = await startStandaloneServer(testServer, {
      context: async () => ({ prisma }),
      listen: { port: 0 }, // Random available port
    });

    url = serverUrl;
  });

  after(() => {
    sinon.restore();
    testServer.stop();
  });

  describe("User Registration", () => {
    it("should register a new user", async () => {
      const registerMutation = `
        mutation Register($name: String!, $email: String!, $password: String!) {
          register(name: $name, email: $email, password: $password) {
            token
            userId
          }
        }
      `;

      // Replace chai-http with fetch
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: registerMutation,
          variables: {
            name: "Test User",
            email: "test@example.com",
            password: "password123",
          },
        }),
      });

      const responseData = await response.json();
      expect(response.status).to.equal(200);
      expect(responseData.data.register).to.have.property("token");
      expect(responseData.data.register).to.have.property("userId");
    });
  });

  describe("User Login", () => {
    it("should return token for valid credentials", async () => {
      const loginMutation = `
        mutation Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            token
          }
        }
      `;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: loginMutation,
          variables: {
            email: "test@example.com",
            password: "password123",
          },
        }),
      });

      const responseData = await response.json();
      expect(response.status).to.equal(200);
      expect(responseData.data.login).to.have.property("token");
    });
  });
});
