const request = require("supertest");
// const app = require("../app");
const House = require("./models/House");
const mongoose = require("mongoose");

// import request from "supertest";
// import { app } from "../app";
// import House from "../models/House";
// import mongoose from "mongoose";

describe("POST /api/houses", () => {
  beforeAll(async () => {
    // Connect to a test database before running tests
    await mongoose.connect(process.env.TEST_MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Disconnect from the test database after running tests
    await mongoose.connection.close();
  });

  afterEach(async () => {
    // Clear the test database after each test
    await House.deleteMany({});
  });

  it("should create new houses", async () => {
    const housesData = [
      { unit_type: "studio", rent: 1000, no_of_units: 2 },
      { unit_type: "1BHK", rent: 1500, no_of_units: 3 },
    ];

    const res = await request(app)
      .post("/api/houses")
      .send(housesData)
      .expect(201);

    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Houses created successfully");
    expect(res.body.data.length).toBe(5); // 2 studio units + 3 1BHK units

    const houses = await House.find({});
    expect(houses.length).toBe(5);
  });

  it("should handle errors", async () => {
    const invalidHousesData = [
      { unit_type: "invalid", rent: "invalid", no_of_units: "invalid" },
    ];

    const res = await request(app)
      .post("/api/houses")
      .send(invalidHousesData)
      .expect(500);

    expect(res.body.success).toBe(false);
    expect(res.body.message).toBeDefined();

    const houses = await House.find({});
    expect(houses.length).toBe(0);
  });
});
