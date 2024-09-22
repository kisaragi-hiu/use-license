#!/usr/bin/env node
import { writeFileSync, writeSync } from "node:fs"
import { parseArgs } from "node:util"
import enquirer from "enquirer"
import pkg from "../package.json"
import { spdxJson, spdxList } from "./schema.ts"

// The default behavior on an uncaught exception is to print the source line
// with the error, then print the backtrace or message. Since we ship minified
// code, the "source" line is actually minified, and can easily take up half the
// window. Override the behavior to not do that.
//
// The backtrace is still kept since we should still be catching errors and
// showing our own error messages.
//
// Note that Bun.build runs this check at build time.
if (process.env.NODE_ENV === "production") {
  process.on("uncaughtException", (err) => {
    if (err.message === "<read.ts> Cancelled by user") {
      return
    }
    writeSync(process.stderr.fd, err.stack || err.message)
    process.exitCode = 1
  })
}

/**
 * Download the license whose id is `id`.
 */
async function downloadLicense(id: string) {
  const response = await fetch(
    `https://raw.githubusercontent.com/spdx/license-list-data/refs/heads/main/json/details/${id}.json`,
  )
  const json = await response.json()
  const parsed = spdxJson.parse(json)
  return parsed.licenseText
}

async function licenseList() {
  const response = await fetch(
    `https://raw.githubusercontent.com/spdx/license-list-data/refs/heads/main/json/licenses.json`,
  )
  const json = await response.json()
  return spdxList.parse(json)
}

async function main() {
  const parsedArgs = parseArgs({
    allowPositionals: true,
    options: { help: { type: "string" } },
  })
  if (parsedArgs.values.help) {
    console.log(`use-license (${pkg.homepage})

Usage:
  use-license:
    Choose a license from the SPDX license list to download.
  use-license <ID>:
    Download license matching <ID>.`)
    process.exit(0)
  }
  if (parsedArgs.positionals.length === 0) {
    console.log(JSON.stringify(await licenseList(), null, 2))
  } else {
    writeFileSync("./LICENSE", await downloadLicense(parsedArgs.positionals[0]))
  }
}

main()
