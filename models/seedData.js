import mongoose from "mongoose";
import Shipping from "./shippingModel.js";
import dotenv from "dotenv"; 

dotenv.config(); 

mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {
    await Shipping.deleteMany(); 
    await Shipping.insertMany([
      { cargoType: "fragile", weight: 5, distance: 2, basePrice: 50 },
      { cargoType: "normal", weight: 3, distance: 1, basePrice: 30 },
      { cargoType: "express", weight: 10, distance: 5, basePrice: 100 },
    ]);

    console.log("✅ Sample data inserted");
  } catch (error) {
    console.error("❌ Error seeding data:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedData();
