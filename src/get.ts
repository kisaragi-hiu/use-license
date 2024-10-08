import { spdxJson, spdxList } from "./schema.ts"

/**
 * Fetch the text of the license whose id is `id`.
 */
export async function getLicense(id: string) {
  const response = await fetch(
    `https://raw.githubusercontent.com/spdx/license-list-data/refs/heads/main/json/details/${id}.json`,
  )
  const json = await response.json()
  const parsed = spdxJson.parse(json)
  return parsed.licenseText
}

/**
 * Return list of licenses.
 * If `deprecatedIds` is true, also include ids that are deprecated.
 * If `includeNonfree` is true, also include nonfree licenses.
 */
export async function getLicenseList(
  deprecatedIds = false,
  includeNonfree = false,
) {
  const response = await fetch(
    `https://raw.githubusercontent.com/spdx/license-list-data/refs/heads/main/json/licenses.json`,
  )
  const json = await response.json()
  const parsed = spdxList.parse(json)
  return {
    licenses: parsed.licenses
      .filter((license) => {
        if (deprecatedIds) return true
        return !license.isDeprecatedLicenseId
      })
      .filter((license) => {
        if (includeNonfree) return true
        return license.isFsfLibre || license.isOsiApproved
      }),
    releaseDate: parsed.releaseDate,
  }
}
