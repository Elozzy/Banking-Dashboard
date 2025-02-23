import express from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./middleware/errorHandler";
import accountRoutes from "./routes/accountRoutes";
import { getDatabase, initializeDatabase } from "./utils/database";

const app = express();
const PORT = 4500;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Initialize database and start the app
const startApp = async () => {
    try {
      await initializeDatabase(); // Initialize the database
      const db = getDatabase(); // Retrieve the initialized database instance
      console.log("Database initialized and seeded.");
  
      // Pass the database to the routes or services that need it
      app.use("/api/accounts", accountRoutes(db)); // Adjust the routes to accept db
  
      // Error handling middleware
      app.use(errorHandler);
  
      // Start the server
      app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
      });
    } catch (err) {
      console.error("Error during database initialization:", err);
      process.exit(1); // Exit the process if the database initialization fails
    }
  };
  
  startApp();

export default app;
