import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    define: {
        'process.env.COMMIT_SHORT_SHA': JSON.stringify(process.env.COMMIT_SHORT_SHA),
        'process.env.COMMIT_TAG': JSON.stringify(process.env.COMMIT_TAG),
    },
    resolve: {
        alias: {
            '@': '/resources/js',
            '@@': '/resources',
        },
    },
    build: {
        rollupOptions: {
            external: [/^\/img\//],
        },
    },
    plugins: [
        laravel({
            input: [
                'resources/js/app.js',
                // 'resources/js/test1.js',
                // 'resources/js/test2.js',
                // 'resources/js/test3.js',
                'resources/js/test4.js',
                'node_modules/vanilla-cookieconsent/dist/cookieconsent.umd.js',
            ],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    ssr: {
        /**
         * The requested module 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js' is a CommonJS module, which may not support all module.exports as named exports.
         * https://vite-plugin-ssr.com/broken-npm-package#solution
         */
        noExternal: ['vue-i18n'],
    },
});
