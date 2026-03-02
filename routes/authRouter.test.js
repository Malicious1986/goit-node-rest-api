import request from "supertest";

import app from "../server.js";
import { connectDatabase } from "../db/connectDatabase.js";
import sequelize from "../db/sequelize.js";

import User from "../db/models/User.js";

const loginUser = (credentials) =>
  request(app).post("/api/auth/login").send(credentials);

describe("test /api/auth/login", () => {
  let server = null;

  const TEST_USER = {
    email: "test@example.com",
    password: "Test123456",
  };
  const EXPECTED_SUBSCRIPTION = "starter";

  beforeAll(async () => {
    await connectDatabase();
    const port = Number(process.env.PORT) || 3000;
    server = app.listen(port);
  });

  beforeEach(async () => {
    await request(app).post("/api/auth/register").send(TEST_USER);
  });

  afterAll(async () => {
    server.close();
    await sequelize.close();
  });

  afterEach(async () => {
    await User.destroy({ where: { email: TEST_USER.email } });
  });

  test("test login with correct credentials", async () => {
    const { status, body } = await loginUser(TEST_USER);
    expect(status).toBe(200);
    expect(body.user.email).toBe(TEST_USER.email);
    expect(body.user.subscription).toBe(EXPECTED_SUBSCRIPTION);
    expect(body.token).toBeDefined();
    expect(typeof body.token).toBe("string");
    expect(body.token.length).toBeGreaterThan(0);
  });
});
