#!/usr/bin/env node
import { existsSync, writeFileSync, writeSync } from "node:fs"
import { parseArgs } from "node:util"
import pkg from "../package.json"
import { getLicense, getLicenseList } from "./get.ts"
import { readId, yn } from "./read.ts"

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

async function main() {
  const parsedArgs = parseArgs({
    allowPositionals: true,
    options: {
      force: { type: "boolean", short: "f" },
      help: { type: "boolean" },
      list: { type: "boolean", short: "l" },
      all: { type: "boolean" },
    },
  })
  if (parsedArgs.values.help) {
    console.log(`use-license (${pkg.homepage})

Usage:
  use-license:
    Choose a license from the SPDX license list to download.
  use-license --list:
    List out all available open source licenses.
  use-license --list --all:
    List out all available licenses, including nonfree licenses.
  use-license <ID>:
    Download license matching <ID>.

Options:
  --force (-f):
    Always overwrite instead of asking
  --list (-l):
    List licenses instead of choosing interactively
  --all:
    When listing, include licenses not certified by the OSI or the FSF
  --help:
    show help (this message)`)
  } else if (parsedArgs.values.list) {
    const { all } = parsedArgs.values
    const licenseList = await getLicenseList(false, all)
    for (const license of licenseList.licenses) {
      console.log(
        `${license.licenseId} (${license.name}) https://spdx.org/licenses/${license.licenseId}.html`,
      )
    }
    console.log(`\nLicense list date: ${licenseList.releaseDate}`)
  } else {
    const { force, all } = parsedArgs.values
    const path = "./LICENSE"
    if (existsSync(path)) {
      const cnt =
        force ||
        (await yn(`${path} already exists, do you want to overwrite it?`))
      if (!cnt) return
    }

    const id =
      parsedArgs.positionals.length !== 0
        ? parsedArgs.positionals[0]
        : await readId("Choose a license", all)
    if (typeof id === "undefined") return

    writeFileSync(path, await getLicense(id))
  }
}

if (process.argv[1] === import.meta.filename) {
  main()
}
