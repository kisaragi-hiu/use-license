import prompts from "prompts"
import { getLicenseList } from "./get.ts"

export async function yn(message: string) {
  const result = await prompts({
    type: "confirm",
    name: "value",
    message: message,
  })
  return result.value as boolean
}

export async function readId(
  message: string,
  includeNonfree: boolean | undefined,
) {
  const result = await prompts({
    type: "autocomplete",
    name: "id",
    message: message,
    limit: 10,
    choices: (await getLicenseList(false, includeNonfree)).licenses.map(
      (license) => ({
        title: `${license.licenseId} (${license.name})`,
        value: license.licenseId,
      }),
    ),
    suggest: async (input: string, choices) => {
      const lowerInput = input.toLowerCase()
      return choices.filter((item) => {
        const needle = item.title + (item.description ?? "")
        return needle.toLowerCase().includes(lowerInput)
      })
    },
  })
  if (typeof result?.id === "string") {
    return result.id
  } else {
    return
  }
}
