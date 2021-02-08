const Classes = require("./model")
const db = require("../../data/db-config")

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

describe("Classes model", () => {
  describe("Function - Classes.add", () => {
    it("Adds class to db", async () => {
      let res

      await Classes.add(course1)
      res = await db("classes")
      expect(res).toHaveLength(1)

      await Classes.add(course2)
      res = await db("classes")
      expect(res).toHaveLength(2)
    })
    it("Resolves to added class", async () => {
      const res = await Classes.add(course1)
      expect(res).toMatchObject(course1)
    })
  })

  describe("Function - Classes.find", () => {
    beforeEach(async () => {
      await db("classes").insert(course1)
      await db("classes").insert(course2)
    })
    it("Resolves to a list of classes", async () => {
      const res = await Classes.find()

      expect(res).toHaveLength(2)
      expect(res).toMatchObject([course1, course2])
    })
  })

  describe("Function - Classes.findBy", () => {
    beforeEach(async () => {
      await db("classes").insert(course1)
      await db("classes").insert(course2)
    })
    it("Resolves to a single class with correct filter", async () => {
      let res

      res = await Classes.findBy({ class_id: 1 })
      expect(res).toMatchObject({ class_id: 1, ...course1 })

      res = await Classes.findBy({ name: "Sprinting" })
      expect(res).toMatchObject({ class_id: 2, ...course2 })
    })
  })

  describe("Funtion - Classes.update", () => {
    beforeEach(async () => {
      await db("classes").insert(course1)
      await db("classes").insert(course2)
    })
    it("Updates the class", async () => {
      const id = 1
      await Classes.update({ ...course1, name: "SPRINTING" }, id)
      const res = await db("classes").where("class_id", id).first()
      expect(res.name).toBe("SPRINTING")
    })
    it("Resolves to updated class", async () => {
      const id = 1
      await Classes.update({ ...course1, name: "SPRINTING" }, id)
      const res = await db("classes").where("class_id", id).first()
      expect(res).toMatchObject({ ...course1, name: "SPRINTING" })
    })
  })

  describe("Function - Classes.remove", () => {
    beforeEach(async () => {
      await db("classes").insert(course1)
      await db("classes").insert(course2)
    })
    it("Removes the class", async () => {
      const id = 1
      await Classes.remove(id)
      const res = await db("classes")
      expect(res).toHaveLength(1)
    })
  })
})