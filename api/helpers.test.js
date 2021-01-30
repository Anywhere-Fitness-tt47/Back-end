const help = require("./helpers")

describe("helpers module", () => {
  it("can add two numbers", () => {
    const actualOutput = help.sum(2, 5)
    const expectedOutput = 7
    expect(actualOutput).toBe(expectedOutput)
  })
})
