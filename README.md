# use-license

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

## Prior art

- [npm:license](https://github.com/Ovyerus/license) by Ovyerus
  - Has some extra stuff around filling out license templates.
    - `use-license` instead just throws the license text into `./LICENSE`, and you are always expected to fill it out manually.
  - Seems like it does extra text wrapping
  - Relies on [a fork](https://github.com/Ovyerus/licenses) of [spdx-license-list](https://github.com/sindresorhus/spdx-license-list), both of which require periodic updates
    - `use-license` fetches directly from [spdx/license-list-data](https://github.com/spdx/license-list-data/), therefore needs internet access but will always be up to date
