const Users = require("./model")
const db = require("../../data/db-config")

const corey = {
  username: "Corey1248",
  first_name: "Corey",
  last_name: "Power",
  email: "CPower1248@gmail.com",
  password: "Reyxco",
  role: "instructor"
}

const phil = {
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

describe("Users model", () => {
  describe("Function - Users.add", () => {
    it("Adds user to db", async () => {
      let res

      await Users.add(corey)
      res = await db("users")
      expect(res).toHaveLength(1)

      await Users.add(phil)
      res = await db("users")
      expect(res).toHaveLength(2)
    })
    it("Resolves to the added user", async () => {
      const res = await Users.add(corey)
      expect(res).toMatchObject(corey)
    })
  })

  describe("Function - Users.find", () => {
    beforeEach(async () => {
      await db("users").insert(corey)
      await db("users").insert(phil)
    })
    it("Resolves to a list of users", async () => {
      let res = await Users.find()

      expect(res).toHaveLength(2)
      expect(res).toMatchObject([corey, phil])
    })
  })
  
  describe("Function - Users.findBy", () => {
    beforeEach(async () => {
      await db("users").insert(corey)
      await db("users").insert(phil)
    })
    it("Resolves to a single user with correct filter", async () => {
      let res

      res = await Users.findBy({ id: 1 })
      expect(res).toMatchObject({ id: 1, ...corey })

      res = await Users.findBy({ username: "Phil1248" })
      expect(res).toMatchObject({ id: 2, ...phil })
    })
  })
})
