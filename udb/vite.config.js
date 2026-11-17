import { loadEnv } from 'vite'

/**
 * Vite builds this page without the site build, which is what replaces ${mapsApiKey} in the other pages: the key
 * is taken from rr0.org/.env (never committed) for the map of places to work.
 */
function mapsApiKey (mode) {
  const key = loadEnv(mode, '..', 'GOOGLE_MAPS_API_KEY').GOOGLE_MAPS_API_KEY
  return {
    name: 'rr0-maps-api-key',
    transformIndexHtml (html) {
      if (!key) {
        throw new Error('GOOGLE_MAPS_API_KEY is missing from rr0.org/.env: the map of places would not work')
      }
      return html.replaceAll('${mapsApiKey}', key)
    }
  }
}

export default ({ mode }) => ({
  base: 'udb',
  plugins: [mapsApiKey(mode)],
  build: {
    outDir: '../out/udb',
    target: 'esnext',
    rollupOptions: {
      input: 'index.html'
    }
  }
})
