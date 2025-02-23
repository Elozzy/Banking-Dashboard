import app from "./app";
import { initializeDatabase } from "./utils/database";

const PORT = process.env.PORT || 3001;

// Initialize database
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
