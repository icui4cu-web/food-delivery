module.exports = {
	plugins: process.env.NODE_ENV === 'production' ? [
		require('./plugins/postcss-fluid.cjs'),
		require('@csstools/postcss-media-minmax')(),
		require('postcss-sort-media-queries')(),
		require('autoprefixer')
	] : [
		require('./plugins/postcss-fluid.cjs')
	]
};
