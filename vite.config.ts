import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import basicSsl from '@vitejs/plugin-basic-ssl'
import tsconfigPaths from 'vite-tsconfig-paths'


export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    basicSsl()]
})
