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
let token

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
  instructor_username: "Corey1248"
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
  instructor_username: "Corey1248"
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
})
afterAll(async () => {
  await db.destroy()
})

describe("Server", () => {
  it("Is the correct env", () => {
    expect(process.env.NODE_ENV).toBe("testing")
  })
  
  it("Responds with status 200 and api: 'up'", async () => {
    const res = await request(server).get("/")
  
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ api: "up" })
  })
  
  describe("Auth router", () => {
    describe("[POST] /api/auth/register", () => {
      it("Resolves to the newly added user", async () => {
        let res
  
        res = await request(server)
          .post("/api/auth/register").send(corey)
        expect(res.body)
          .toMatchObject({ id: 1, username: corey.username })
  
        res = await request(server)
          .post("/api/auth/register").send(phil)
        expect(res.body)
          .toMatchObject({ id: 2, username: phil.username })
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
        token = res.body.token

        expect(res.body).toMatchObject({ token })
        expect(res.body.user).toMatchObject({ username: corey.username })
      })
    })
  })

  describe("With authorization", () => {
    beforeEach(async () => {
      await request(server)
        .post("/api/auth/register").send(corey)

      await request(server)
        .post("/api/auth/register").send(phil)
    })

    describe("Users router", () => {
      describe("[GET] /api/users", () => {
        it("Responds with a list of registered users", async () => {
          const res = await request(server)
            .get("/api/users").set("Authorization", token)
            
          expect(res.body).toHaveLength(2)
        })
      })
  
      describe("[GET] /api/users/:id", () => {
        it("Responds with a single user by id", async () => {
          let res
          
          res = await request(server)
            .get("/api/users/1").set("Authorization", token)
          expect(res.body).toMatchObject({ username: corey.username })
  
          res = await request(server)
            .get("/api/users/2").set("Authorization", token)
          expect(res.body).toMatchObject({ username: phil.username })
        })
      })
    })
  
    describe("Classes router", () => {
      describe("[POST] /api/classes", () => {
        it("Adds new class to the db", async () => {
          let res
  
          res = await request(server)
            .post("/api/classes").set("Authorization", token)
            .send(course1)
          expect(res.body).toMatchObject(course1)

          res = await request(server)
            .post("/api/classes").set("Authorization", token)
            .send(course2)
          expect(res.body).toMatchObject(course2)
        })
      })

      describe("With classes", () => {
        beforeEach(async () => {
          await request(server)
            .post("/api/classes").set("Authorization", token)
            .send(course1)
          await request(server)
            .post("/api/classes").set("Authorization", token)
            .send(course2)
        })

        describe("[GET] /api/classes/:id", () => {
          it("Responds with a single class by class_id", async () => {
            let res
            
            res = await request(server)
              .get("/api/classes/1").set("Authorization", token)
            expect(res.body).toMatchObject(course1)
  
            res = await request(server)
              .get("/api/classes/2").set("Authorization", token)
            expect(res.body).toMatchObject(course2)
          })
        })

        describe("[PUT] /api/classes/:id", () => {
          it("Updates class in db", async () => {
            let res = await request(server)
              .put("/api/classes/1").set("Authorization", token)
              .send({ ...course1, name: "PUSH-UPS" })

            expect(res.body).toMatchObject({ name: "PUSH-UPS" })
          })
        })

        describe("[DELETE] /api/classes/:id", () => {
          it("Responds with confirmation message", async () => {
            let res = await request(server)
              .delete("/api/classes/1").set("Authorization", token)

            expect(res.body).toBe("The class with id 1 was removed")
          })
        })

        describe("User_Classes router", () => {
          describe("[POST] /api/user_classes", () => {
            it("Adds user to class in db", async () => {
              let res
              
              res = await request(server)
                .post("/api/user_classes").set("Authorization", token)
                .send(join1)
              expect(res.body.data).toMatchObject(join1)
              
              res = await request(server)
                .post("/api/user_classes").set("Authorization", token)
                .send(join4)
              expect(res.body.data).toMatchObject(join4)
            })

            describe("With user joined classes", () => {
              beforeEach(async () => {
                await request(server)
                  .post("/api/user_classes").set("Authorization", token)
                  .send(join1)
                await request(server)
                  .post("/api/user_classes").set("Authorization", token)
                  .send(join2)
                await request(server)
                  .post("/api/user_classes").set("Authorization", token)
                  .send(join3)
                await request(server)
                  .post("/api/user_classes").set("Authorization", token)
                  .send(join4)
              })

              // This EP is not included in documentation =====================
              describe("[GET] /api/user_classes", () => {
                it("Responds with a list of user joined classes", async () => {
                  const res = await request(server)
                    .get("/api/user_classes/devtest").set("Authorization", token)

                  expect(res.body).toHaveLength(4)
                })
              })
              // ==============================================================

              describe("[GET] /api/user_classes/user/:id", () => {
                it(
                  "Responds with a list of classes joined by the user", 
                  async () => {
                    let res
                    
                    res = await request(server)
                      .get("/api/user_classes/user/1").set("Authorization", token)
                    expect(res.body).toMatchObject([join1, join2])

                    res = await request(server)
                      .get("/api/user_classes/user/2").set("Authorization", token)
                    expect(res.body).toMatchObject([join3, join4])
                })
              })

              describe("[GET] /api/user_classes/class/:id", () => {
                it(
                  "Responds with a list of users who've joined the class", 
                  async () => {
                    let res
                    
                    res = await request(server)
                      .get("/api/user_classes/class/1").set("Authorization", token)
                    expect(res.body).toMatchObject([join1, join3])

                    res = await request(server)
                      .get("/api/user_classes/class/2").set("Authorization", token)
                    expect(res.body).toMatchObject([join2, join4])
                })
              })
              
              describe("[DELETE] /api/user_classes", () => {
                it("Responds with confirmation message", async () => {
                  let res = await request(server)
                    .delete("/api/user_classes").set("Authorization", token)
                    .send(join1)

                  expect(res.body).toBe("User 1 was removed from class 1")
                })
              })
            })
          })
        })
      })
    })
  })
})
