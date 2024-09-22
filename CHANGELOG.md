# use-license

## 0.1.1 (2024-09-22)

Fix the command doing nothing when run through npx.

## 0.1.0 (2024-09-22)

Initial release.

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
