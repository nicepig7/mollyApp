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

            '@asset'  : url('src/asset'),
            '@compo'  : url('src/compo'),
            '@common' : url('src/common'),
            '@frame'  : url('src/frame'),
            '@page'   : url('src/page'),
            '@screen' : url('src/screen'),
            //---
            '@style'  : url('src/asset/style'),
            //---
            '$mixin'  : url('src/asset/style/inject/fdMixin.scss'),
            '$token'  : url('src/asset/style/inject/fdToken.scss'),
            '$util'   : url('src/common/util/index.ts'),
            '$key'    : url('src/common/key/index.ts'),
            '$service': url('src/service/index.ts'),
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
    }
});

function url(path:String) {return fileURLToPath(new URL(path, import.meta.url))}