#!/usr/bin/env node
import { existsSync, writeFileSync, writeSync } from "node:fs"
import { parseArgs } from "node:util"
import pkg from "../package.json"
import { getLicense } from "./get.ts"
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
      help: { type: "boolean" },
      force: { type: "boolean" },
      nonfree: { type: "boolean" },
    },
  })
  if (parsedArgs.values.help) {
    console.log(`use-license (${pkg.homepage})

Usage:
  use-license:
    Choose a license from the SPDX license list to download.
  use-license <ID>:
    Download license matching <ID>.

Options:
  --force: Always overwrite instead of asking
  --nonfree: Include licenses not certified by the OSI or the FSF
  --help: show help (this message)`)
    process.exit(0)
  }
  const { force, nonfree } = parsedArgs.values
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
      : await readId("Choose a license", nonfree)
  if (typeof id === "undefined") return

  writeFileSync(path, await getLicense(id))
}

if (process.argv[1] === import.meta.filename) {
  main()
}
