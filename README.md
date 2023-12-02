# Akantro Shopify Theme Framework

## Features

- Bun
- Vite
- TailwindCSS
- Live Reload
- Shopify CLI
- JS Modules
- Sass
- PostCSS
- Autoprefixer
- Works with ANY Shopify Theme

## Install Bun

`curl -fsSL https://bun.sh/install | bash`

## Install Shopify CLI

`brew tap shopify/shopify`
`brew install shopify-cli`

## Install Project Dependencies

`bun install`

## Set up your shopify.theme.toml

```
[environments.development]
theme = "{theme_id}"
store = "{store_name}.myshopify.com"
password  = "{password}"
path = "./dist"
output = "json"
host = "localhost"
ignore = [
  "config/settings_data.json",
  "**/*.json"
]
live-reload = "off"

[environments.production]
theme = "{theme_id}"
store = "{store_name}.myshopify.com"
password  = "{password}"
path = "./dist"
ignore = [
  "config/settings_data.json",
  "**/*.json"
]
output = "json"
```

## Start

`bun run start`

## Build

``bun run build`

## Push

`bun run push`
