# use-license

[![NPM Version](https://img.shields.io/npm/v/use-license)](https://www.npmjs.com/package/use-license) [![Coverage Status](https://coveralls.io/repos/github/kisaragi-hiu/use-license/badge.svg?branch=main)](https://coveralls.io/github/kisaragi-hiu/use-license?branch=main) [![BMC](https://img.shields.io/badge/buy%20me%20a%20coffee-kisaragihiu-FD0)](https://buymeacoffee.com/kisaragihiu)

Yet another take at a license downloader.

```sh
npx use-license
```

License data is guaranteed to be up to date as license list and text are fetched directly [from SPDX](https://github.com/spdx/license-list-data/).

## Usage

To choose a license:

```sh
npx use-license
```

This will show a list of all SPDX licences that are certified by the OSI or the FSF for selection. After selection it'll write the license text into `./LICENSE`.

Some licenses have fields to fill out. `use-license` has not implemented this functionality — the user is expected to fill it out themself.

To skip the prompt:

```sh
npx use-license MIT # or any SPDX identifier
```

This will download the MIT license into the `./LICENSE` file.

## Full usage

```sh
# Show help
npx use-license --help

# List all open source licenses in the SPDX license list
npx use-license --list

# List all licenses in the SPDX license list, including nonfree licenses
# (licenses not certified by the OSI or FSF)
npx use-license --list --all

# Select a license to open in browser
npx use-license --open
# Open license whose id is <ID> in browser
npx use-license --open "<ID>"
# --open is just a boolean flag
npx use-license "<ID>" --open

# Select a license to download
npx use-license
# Select a license to download; also show nonfree licenses as candidates
npx use-license --all
# Download the license whose id is <ID>
npx use-license "<ID>"
# Always overwrite ./LICENSE instead of asking when it exists
npx use-license --force
```

## Thanks

- Inspiration: [npm:gitignore](https://github.com/msfeldstein/gitignore) by msfeldstein, [npm:license](https://github.com/Ovyerus/license) by Ovyerus
- [spdx's license-list-data](https://github.com/spdx/license-list-data) and [SPDX](https://spdx.dev/) in general

## Prior art

- [npm:license](https://github.com/Ovyerus/license) by Ovyerus
  - Has some extra stuff around filling out license templates.
    - `use-license` instead just throws the license text into `./LICENSE`, and you are always expected to fill it out manually.
  - Seems like it does extra text wrapping
  - Relies on [a fork](https://github.com/Ovyerus/licenses) of [spdx-license-list](https://github.com/sindresorhus/spdx-license-list), both of which require periodic updates
    - `use-license` fetches directly from [spdx/license-list-data](https://github.com/spdx/license-list-data/), therefore needs internet access but will always be up to date
