#!/usr/bin/env node
import { parseArgs } from "node:util"
import { writeSync } from "node:fs"
import enquirer from "enquirer"

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

function main() {
  const parsedArgs = parseArgs({
    allowPositionals: true,
    options: { help: { type: "string" } },
  })
  console.log(parsedArgs)
}

main()
