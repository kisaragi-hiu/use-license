import { expect, test } from "bun:test"
import { licenseList } from "./index.ts"

test("getting and parsing license list", async () => {
  expect(await licenseList()).toEqual(expect.anything())
})

// test("every license works", async () => {
//   const licenses = (await licenseList()).licenses
//   for (const { licenseId } of licenses) {
//     expect(await downloadLicense(licenseId)).toEqual(expect.anything())
//   }
// })
