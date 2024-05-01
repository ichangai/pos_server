import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";
import Tenant from "../models/Tenant";

describe("POST /api/tenant", () => {
  beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Disconnect from the test database
    await mongoose.connection.close();
  });

  afterEach(async () => {
    // Clear the test database after each test
    await Tenant.deleteMany({});
  });

  it("should create a new tenant", async () => {
    const tenantData = {
      house: "660557da9d255abfadf76476",
      fullName: "John Doe",
      phone: "1234567890",
      rent: 1000,
      id_no: "123456789",
      email: "john@example.com",
      status: "cleared",
      next_of_kin: "Jane Doe",
      next_of_kin_phone: "9876543210",
    };

    const res = await request(app)
      .post("/api/tenants")
      .send(tenantData)
      .expect(201);

    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Tenant created successfully");
    expect(res.body.data).toHaveProperty("house", tenantData.house);
    expect(res.body.data).toHaveProperty("fullName", tenantData.fullName);
    expect(res.body.data).toHaveProperty("phone", tenantData.phone);
    expect(res.body.data).toHaveProperty("rent", tenantData.rent);
    expect(res.body.data).toHaveProperty("id_no", tenantData.id_no);
    expect(res.body.data).toHaveProperty("email", tenantData.email);
    expect(res.body.data).toHaveProperty("status", tenantData.status);
    expect(res.body.data).toHaveProperty("next_of_kin", tenantData.next_of_kin);
    expect(res.body.data).toHaveProperty(
      "next_of_kin_phone",
      tenantData.next_of_kin_phone
    );

    const createdTenant = await Tenant.findById(res.body.data._id);
    expect(createdTenant).toBeDefined();
  });
});
