import {resolve} from 'path';
import {defineConfig} from 'vite';
import {svelte} from '@sveltejs/vite-plugin-svelte';
import {createRequire} from 'node:module';
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';

const require = createRequire(import.meta.url);

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: {
                "editor-lib": resolve(__dirname, 'src/main.ts'),
                ckeditor: resolve(__dirname, 'src/ckeditor5.ts'),
            },
            name: 'Editor',
            formats: ["es", "cjs"],
        },
        emptyOutDir: true,
        outDir: "dist",
        minify: 'esbuild',
        target: 'esnext'
    },
    esbuild: {
        minifyWhitespace: true,
        minifyIdentifiers: true,
        minifySyntax: true
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
