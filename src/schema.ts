import { z } from "zod"

export const spdxJson = z.object({
  name: z.string(),
  licenseId: z.string(),
  isOsiApproved: z.boolean(),
  isFsfLibre: z.optional(z.boolean()),
  isDeprecatedLicenseId: z.boolean(),
  standardLicenseTemplate: z.string(),
  licenseText: z.string(),
})

const licenseMeta = z.object({
  name: z.string(),
  licenseId: z.string(),
  isDeprecatedLicenseId: z.boolean(),
  isOsiApproved: z.boolean(),
  isFsfLibre: z.optional(z.boolean()),
})

export const spdxList = z.object({
  licenses: licenseMeta.array(),
  releaseDate: z.string().date(),
})
