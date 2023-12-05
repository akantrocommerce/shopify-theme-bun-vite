[akantro]: https://www.akantro.com
[bun]: https://bun.sh
[vite]: https://vitejs.dev
[tailwindcss]: https://tailwindcss.com
[shopify-cli]: https://shopify.dev/themes/tools/cli
[shopify-dawn-theme]: https://github.com/Shopify/dawn

# Akantro Shopify Theme Framework 1.0

<img
  src="https://cdn.shopify.com/s/files/1/0789/5479/1188/files/akantro_theme_framework.png?v=1701735919"
  alt="Bun"
  width="1584"
  height="auto"
/>

Visit [akantro.com][akantro] to follow for updates.

## About

Akantro Shopify Theme Framework is a Shopify Theme development workflow built on top of Bun and Vite. It is designed to be a lightweight, fast, and easy to use framework for building Shopify Themes. It is built to work with any Shopify Theme. It is not a theme itself, but a framework for building themes.

[Bun][bun] is a new JavaScript runtime created for the modern JavaScript ecosystem with a focus on speed, elegant APIs, and a cohesive developer experience. It is designed as a drop-in replacement for Node.js, implementing numerous Node.js and Web APIs. The primary objectives of Bun are to run server-side JavaScript efficiently and enhance developer productivity by offering a complete toolkit, including a package manager, test runner, and bundler.

[Vite][vite] is a build tool designed to enhance the development experience for modern web projects. It comprises a fast development server with features like Hot Module Replacement (HMR) and a build command that uses Rollup to create optimized static assets for production. Vite comes with opinionated defaults but allows customization through Plugins and a Config Section. It is highly extensible, offering a Plugin API and JavaScript API with typing support. For further details, the Features Guide and Why Vite sections provide additional information.

We've coupled Vite with [TailwindCSS][tailwindcss] to provide a fast, modern, and easy to use development workflow for building Shopify Themes.

Together, Bun and Vite provide a fast, modern, and easy to use development workflow for building Shopify Themes.

Shopify's Dawn Theme v12.0.0 comes packed in this workflow by default. Visit the repo [shopify-dawn-theme] for more information on Dawn.

This framework is compatible with ANY Shopify Theme.

[Akantro][akantro] is a digital product design and development agency dedicated to helping Shopify merchants enhance their success. Specializing in cutting-edge technologies like AI, serverless, headless, and composable tech. Founded by an industry expert, the agency provides customized digital solutions, including UX/UI design, storefront development, app development, and more.

Akantro is a Shopify Partner.

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
- Packaged w/ Dawn Theme v12.0.0
- Compatible with ANY Shopify Theme

## Install Bun

`curl -fsSL https://bun.sh/install | bash`

## Install Shopify CLI

`brew tap shopify/shopify`
`brew install shopify-cli`

More details on Shopify CLI can be found [here][shopify-cli].

## Theme setup

- If you're not using Dawn, you may place your custom theme files in the `/theme` directory.
  - You must follow the Shopify Theme file structure:
  ```
    theme
      ├── assets
      ├── config
      ├── layout
      ├── locales
      ├── sections
      ├── snippets
      └── templates
  ```
- Install the site-wide scripts and styles in your `theme.liquid` file:

  ```
    {% comment %} Theme index.js {% endcomment %}
    <script src="{{ 'index.js' | asset_url }}" defer="defer"></script>

    {% comment %} Theme index.css {% endcomment %}
    {{ 'index.css' | asset_url | stylesheet_tag }}
  ```

- Install the Theme Access app from the Shopify App Store.
- Generate a private key for the Theme Access app.
- Configure your `shopify.theme.toml` file with your theme ID, store name, and password.
- Login to your Shopify store using the Shopify CLI.
- When you set up a store, run `shopify theme list -e development` to ensure that your theme and environment are set up correctly.

## Example shopify.theme.toml file

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

## Install Project Dependencies

`bun install`

## Start

`bun run start`

## Build

`bun run build`

## Push

`bun run push`
