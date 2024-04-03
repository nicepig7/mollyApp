import { URL, fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import analyzer from 'rollup-plugin-analyzer'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        extensions : ['.vue', '.js', '.ts', '.scss', '.css'],
        alias: {
            '@' : url('src'),

            '@asset': url('src/asset'),
            '@compo': url('src/compo'),
            '@frame': url('src/frame'),
            '@page' : url('src/page'),
            //---
            '@style' : url('src/asset/style'),
        },
    },
    plugins: [
        vue(),
        analyzer({ summaryOnly: true }),
    ],
    build: {
        rollupOptions: {
            input: {
                app:  './src/index.html'
            }
        }
    },
    server: {
        open: './src/index.html'
    }
});

function url(path) {return fileURLToPath(new URL(path, import.meta.url))}