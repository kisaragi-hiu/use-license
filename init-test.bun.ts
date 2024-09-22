/**
 * @file Preload file for `bun test`, enabled through test.preload in bunfig.toml.
 */

import { afterAll } from "bun:test"
import { mkdtempSync, rmSync } from "node:fs"
import { join } from "node:path"

const os = require("node:os")

const tmp = mkdtempSync(join(os.tmpdir(), "bun-test"))
process.env.HOME = tmp
os.homedir = () => {
  return tmp
}

afterAll(() => {
  rmSync(tmp, { recursive: true })
})
