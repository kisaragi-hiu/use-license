import { expect, test } from "bun:test"
import { getLicense, getLicenseList } from "./get.ts"

test("getting and parsing license list", async () => {
  expect(await getLicenseList()).toEqual(expect.anything())
})

const licenses = (await getLicenseList(true, true)).licenses
test.each(licenses.map((license) => [license.licenseId]))(
  "Can fetch and parse: %s",
  async (id) => {
    expect(await getLicense(id)).toEqual(expect.anything())
  },
)
