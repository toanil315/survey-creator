import {   defineConfig } from 'vite';
import * as path from "path";
import { reactRouter } from "@react-router/dev/vite";
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  },
  server: {
    port: 3001
  },
  ssr: {
    noExternal: [
      /@fluentui|@swc|@floating-ui/ ,
      '@griffel/react',
    ],
  },
  
});
