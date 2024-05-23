export default {
  base: 'udb',
  build: {
    outDir: '../out/udb',
    target: 'esnext',
    rollupOptions: {
      input: 'index.html'
    }
  }
}
