import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

beforeAll(async () => {
  // Connect to test database
  await mongoose.connect(process.env.MONGO_URI);
  
  // Clean database before tests start
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
});

afterAll(async () => {
  // Clean up after all tests
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
  
  // Close database connection
  await mongoose.connection.close();
});