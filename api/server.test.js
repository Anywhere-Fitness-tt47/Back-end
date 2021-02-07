const request = require("supertest")
const db = require("../data/db-config")
const server = require("./server")

let corey = {
  username: "Corey1248",
  first_name: "Corey",
  last_name: "Power",
  email: "CPower1248@gmail.com",
  password: "Reyxco",
  role: "instructor"
}

let phil = {
  username: "Phil1248",
  first_name: "Phil",
  last_name: "Harris",
  email: "PHarris1248@gmail.com",
  password: "Hixpl",
  role: "client"
}

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.raw('TRUNCATE user_classes, users, classes RESTART IDENTITY CASCADE')
})
afterAll(async () => {
  await db.destroy()
})

it("Is the correct env", () => {
  expect(process.env.NODE_ENV).toBe("testing")
})

describe("Server", () => {
  describe("[GET] /", () => {
    it("Responds with status 200 and api: 'up'", async () => {
      const res = await request(server).get("/")
      expect(res.status).toBe(200)
      expect(res.body).toEqual({ api: "up" })
    })
  })
  describe("[POST] /api/auth/register", () => {
    it("Resolves to the newly added user", async () => {
      let res

      res = await request(server)
        .post("/api/auth/register").send(corey)

      expect(res.body).toMatchObject({ id: 1, username: corey.username })

      res = await request(server)
        .post("/api/auth/register").send(phil)
      expect(res.body).toMatchObject({ id: 2, username: phil.username })
    })
  })

  describe("[POST] /api/auth/login", () => {
    beforeEach(async () => {
      await request(server)
        .post("/api/auth/register").send(corey)

      await request(server)
        .post("/api/auth/register").send(phil)
    })
    it("Resolves with token and user data", async () => {
      let res
      res = await request(server)
        .post("/api/auth/login").send({ 
          username: corey.username,
          password: corey.password
        })
      expect(res.body).toHaveProperty("token")
      expect(res.body.user).toMatchObject({ username: corey.username })
    })
  })
})
