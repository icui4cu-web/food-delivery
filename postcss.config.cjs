module.exports = {
	plugins: process.env.NODE_ENV === 'production' ? [
		require('@csstools/postcss-media-minmax')(),
		require('postcss-sort-media-queries')(),
		require('autoprefixer')
	] : []
};
