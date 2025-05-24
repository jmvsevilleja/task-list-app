import express from "express";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import { PrismaClient } from "@prisma/client";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/tasks";
import { errorHandler } from "./middleware/errorHandler";
import { json } from "body-parser";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

async function startServer() {
  const app = express();

  // Create Apollo Server
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Start Apollo Server
  await apolloServer.start();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // REST Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/tasks", taskRoutes);

  // GraphQL Route
  app.use(
    "/graphql",
    json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (token) {
          try {
            const decoded = jwt.verify(
              token,
              process.env.JWT_SECRET || "your_jwt_secret"
            ) as { userId: number };
            return { userId: decoded.userId, prisma };
          } catch (error) {
            // Invalid token
          }
        }
        return { prisma };
      },
    })
  );

  // Error handling middleware
  app.use(errorHandler);

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
  });

  process.on("SIGINT", async () => {
    await prisma.$disconnect();
    process.exit();
  });
}

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
