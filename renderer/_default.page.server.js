export { render }
// See https://vike.dev/data-fetching
export const passToClient = ['pageProps', 'urlPathname']

import { renderToString as renderToString_ } from '@vue/server-renderer'
import { escapeInject, dangerouslySkipEscape } from 'vike/server'
import { createApp } from './app'
import logoUrl from '../src/assets/images/logo.svg'

async function render(pageContext) {
  const { Page, pageProps, documentProps } = pageContext;
  // This render() hook only supports SSR, see https://vike.dev/render-modes for how to modify render() to support SPA
  if (!Page) throw new Error('My render() hook expects pageContext.Page to be defined')
  const app = createApp(Page, pageProps, pageContext)

  const appHtml = await renderToString(app)

  // See https://vike.dev/head

  const dp = documentProps
    ? documentProps
    : {
        title: "Title not Set",
        description: "Welcome to My Portfolio, Enjoy your stay!",
        cover_image: {}, // placeholder required,
        locale: "en",
        robots: `follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large`,
      };
 
  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="${dp.locale}">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${dp.title}</title>
        <meta name="description" content="${dp.description}" />
        <meta name="robots" content="${dp.robots}" />

        <link rel="canonical" href="${dp.url}" />
        <meta property="og:locale" content="${dp.locale}" />
        <meta property="og:type" content="${dp.type}" />
        <meta property="og:title" content="${dp.title}" />
        <meta property="og:description" content="${dp.description}" />
        <meta property="og:url" content="${dp.url}" />
        <meta property="og:site_name" content="${dp.title}" />

        <meta property="og:image" content="${dp.cover_image.src}" />
        <meta property="og:image:secure_url" content="${dp.cover_image.src}" />
        <meta property="og:image:width" content="${dp.cover_image.width}" />
        <meta property="og:image:height" content="${dp.cover_image.height}" />
        <meta property="og:image:alt" content="${dp.cover_image.alt}" />
        <meta property="og:image:type" content="${dp.cover_image.type}" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${dp.title}" />
        <meta name="twitter:description" content="${dp.description}" />
        <meta name="twitter:image" content="${dp.cover_image.src}" />

      </head>
      <body>
        <div id="app">${dangerouslySkipEscape(appHtml)}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vike.dev/page-redirection
    }
  }
}

async function renderToString(app) {
  let err
  // Workaround: renderToString_() swallows errors in production, see https://github.com/vuejs/core/issues/7876
  app.config.errorHandler = (err_) => {
    err = err_
  }
  const appHtml = await renderToString_(app)
  if (err) throw err
  return appHtml
}
