// @ts-check
import { defineConfig } from 'astro/config';
import htmlBeautifier from "astro-html-beautifier";

export default defineConfig({
	compressHTML: false,
	trailingSlash: 'never',
	build: {
		inlineStylesheets: 'never',
		format: 'preserve',
		assets: 'assets'
	},
	vite: {
		build: {
			assetsInlineLimit: 0,
			cssCodeSplit: false,
			minify: true,
			rollupOptions: {
				output: {
					assetFileNames: (assetInfo) => {
						if (assetInfo.name?.endsWith('.css')) return 'assets/css/index.css';
						return 'assets/[name][extname]';
					}
				}
			}
		},
		environments: {
			client: {
				build: {
					rollupOptions: {
						output: {
							manualChunks: () => 'index',
							entryFileNames: 'assets/js/index.js',
							chunkFileNames: 'assets/js/index.js',
							assetFileNames: (assetInfo) => {
								if (assetInfo.name?.endsWith('.css')) return 'assets/css/index.css';
								return 'assets/[name][extname]';
							}
						}
					}
				}
			}
		}
	},
	integrations: import.meta.env.PROD ? [
		htmlBeautifier({ inline: [] })
	] : []
});