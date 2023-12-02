import './style.css' // entry point that loads all the css files update ok
import './scripts/scripts.js' // entry point that loads all the js files now?
import './workflow/scripts/scripts.js' // entry point that loads all the js files now?

// welcome page content
import javascriptLogo from './workflow/assets/javascript.svg'
import viteLogo from './workflow/assets/vite.svg'
import bunLogo from './workflow/assets/bun.png'

const app = document.querySelector('#app');

if (app) {
  app.innerHTML = `
    <div class="flex h-screen items-center justify-center flex-col">
      <h1 class="text-3xl font-bold mb-4">Shopify Theme</h1>
      <div class="flex mb-4">
        <a href="https://bun.sh" target="_blank">
          <img src="${bunLogo}" alt="JavaScript logo" class="mr-4 h-10" />
        </a>
        <a href="https://vitejs.dev" target="_blank" class="mr-4">
          <img src="${viteLogo}" alt="Vite logo" class="h-10" />
        </a>
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
          <img src="${javascriptLogo}" alt="JavaScript logo" class="h-10" />
        </a>
      </div>
      <p class="read-the-docs text-center">
        Modern Shopify 2.0 workflow & toolkit with Vite, Tailwind CSS, and Bun.
      </p>
      <p class="read-the-docs text-center">
        Engineered by Akantro 🚀 https://www.akantro.com
      </p>
    </div>
  `;
}
