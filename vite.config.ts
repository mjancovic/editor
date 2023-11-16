import {resolve} from 'path'
import {defineConfig} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import {createRequire} from 'node:module';
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';

const require = createRequire(import.meta.url);

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/main.ts'),
            name: 'Editor',
            fileName: 'editor'
        }
    },
    plugins: [
        svelte({
            compilerOptions: {
                customElement: true
            },
        }),
        ckeditor5({theme: require.resolve('@ckeditor/ckeditor5-theme-lark')})
    ],
})
