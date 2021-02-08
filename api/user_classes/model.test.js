const User_Classes = require("./model")
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

const course1 = {
  name: "Push-ups", 
  type: "resistance", 
  start_time: "10:00 a.m.", 
  date: "1/1/11",
  duration: 20,
  intensity_level: "medium",
  location: "1234 park address",
  attendees: 8,
  max_size: 10,
  instructor_username: "corey1248"
}
const course2 = {
  name: "Sprinting", 
  type: "cardio", 
  start_time: "10:30 a.m.", 
  date: "2/2/22",
  duration: 30,
  intensity_level: "high",
  location: "main street",
  attendees: 4,
  max_size: 8,
  instructor_username: "corey1248"
}

const join1 = {
  user_id: 1,
  class_id: 1
}
const join2 = {
  user_id: 1,
  class_id: 2
}
const join3 = {
  user_id: 2,
  class_id: 1
}
const join4 = {
  user_id: 2,
  class_id: 2
}

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.raw('TRUNCATE user_classes, users, classes RESTART IDENTITY CASCADE')
  await db("users").insert(corey)
  await db("users").insert(phil)
  await db("classes").insert(course1)
  await db("classes").insert(course2)
})
afterAll(async () => {
  await db.destroy()
})

describe("User_Classes model", () => {
  describe("Function - User_Classes.add", () => {
    it("Adds user to class", async () => {
      let res

      await User_Classes.add(join1)
      await User_Classes.add(join2)
      res = await db("user_classes")
      expect(res).toHaveLength(2)

      await User_Classes.add(join3)
      await User_Classes.add(join4)
      res = await db("user_classes")
      expect(res).toHaveLength(4)
    })
  })

  describe("Function - User_Classes.find", () => {
    beforeEach(async () => {
      await db("user_classes").insert(join1)
      await db("user_classes").insert(join2)
      await db("user_classes").insert(join3)
      await db("user_classes").insert(join4)
    })
    it("Resolves to a list of users joined to classes", async () => {
      const res = await User_Classes.find()

      expect(res).toHaveLength(4)
      expect(res).toMatchObject([join1, join3, join2, join4])
    })
  })

  describe("Function - User_Classes.findBy", () => {
    beforeEach(async () => {
      await db("user_classes").insert(join1)
      await db("user_classes").insert(join2)
      await db("user_classes").insert(join3)
      await db("user_classes").insert(join4)
    })
    it("Resolves to a list of classes joined by a user_id", async () => {
      let res

      res = await User_Classes.findBy({ user_id: 1 })
      expect(res).toHaveLength(2)

      res = await User_Classes.findBy({ user_id: 2 })
      expect(res).toHaveLength(2)
    })
  })

  describe("Function - User_Classes.findByClass", () => {
    beforeEach(async () => {
      await db("user_classes").insert(join1)
      await db("user_classes").insert(join2)
      await db("user_classes").insert(join3)
      await db("user_classes").insert(join4)
    })
    it("Resolves to a list of users who have joined a class_id", async () => {
      let res

      res = await User_Classes.findByClass(1)
      expect(res).toHaveLength(2)

      res = await User_Classes.findByClass(2)
      expect(res).toHaveLength(2)
    })
  })

  describe("Function - User_Classes.findPair", () => {
    beforeEach(async () => {
      await db("user_classes").insert(join1)
      await db("user_classes").insert(join2)
      await db("user_classes").insert(join3)
      await db("user_classes").insert(join4)
    })
    it("Resolves to a single class_id joined by a user_id", async () => {
      let res

      res = await User_Classes.findPair(1, 1)
      expect(res).toMatchObject(join1)

      res = await User_Classes.findPair(2, 2)
      expect(res).toMatchObject(join4)
    })
  })

  describe("Function - User_Classes.remove", () => {
    beforeEach(async () => {
      await db("user_classes").insert(join1)
      await db("user_classes").insert(join2)
      await db("user_classes").insert(join3)
      await db("user_classes").insert(join4)
    })
    it("Removes the user from the class", async () => {
      await User_Classes.remove(join1)
      const res = await db("user_classes")
      expect(res).toHaveLength(3)
    })
  })
})
