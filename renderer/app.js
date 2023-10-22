import { createSSRApp, h } from 'vue'
import PageShell from './PageShell.vue'
import { setPageContext } from './usePageContext'

import axios from "./axios.js";

export { createApp }

function createApp(Page, pageProps, pageContext) {
  const PageWithLayout = {
    render() {
      return h(
        PageShell,
        {},
        {
          default() {
            return h(Page, pageProps || {})
          }
        }
      )
    }
  }

  const app = createSSRApp(PageWithLayout)

  // We make pageContext available from any Vue component
  setPageContext(app, pageContext)

  app.config.globalProperties.$pageContext = pageContext;
  app.config.globalProperties.$axios = axios;
  
  return app
}
