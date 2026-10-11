# Shoply docs

The source of [docs.shoply.gg](https://docs.shoply.gg): guides for running a Shoply store, and the API, webhooks and SDKs for building on it. A [Mintlify](https://mintlify.com) site. **A push to `main` publishes it.**

## What is written by hand and what is not

| Path | What it is |
| - | - |
| `index.mdx`, `guides/`, `sdk/` | Written by hand. |
| `api-reference/*.mdx` | Written by hand, except the two below. |
| `api-reference/openapi.json` | **Generated.** Every route of the API, with what it takes and an example of what it answers. |
| `api-reference/permissions.mdx`, `api-reference/webhook-events.mdx` | **Generated.** |
| `docs.json` | By hand, except the route groups of the "API reference" tab, which are generated. |

The generated files are written out of the API's own code, in the main repository (`backend/api-docs.php`), so the reference cannot say something the server does not do. Do not edit them here: change the route there and build again.

```bash
# in the main repository's backend/
php api-docs.php record         # ask every route for an example, on a throwaway store
php api-docs.php build ../../Docs
```

## Checking it

```bash
npx mint@latest dev             # the site on this machine, at localhost:3000
npx mint@latest broken-links
```

## Writing

- Plain words, short sentences, sentence case. No em or en dashes.
- Original wording. Nothing here is another platform's sentence.
- The dashboard's own names for things, in bold: **Catalogue**, then **Products**.
- A code sample that can be run as it is.
- Made-up people live at `example.com`.
