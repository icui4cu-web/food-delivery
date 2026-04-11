module.exports = () => ({
	postcssPlugin: 'postcss-fluid',
	Declaration(decl) {
		if (!decl.value.includes('fluid(')) return;
		decl.value = decl.value.replace(
			/fluid\(([^)]+)\)/g,
			(_, args) => {
				const fmt = n => parseFloat(n.toFixed(4));

				const parts = args.split(',').map(s => s.trim());
				const from = parseFloat(parts[0]);
				const to = parseFloat(parts[1]);
				const mediaFrom = parts[2] ? parseFloat(parts[2]) : 390;
				const mediaTo = parts[3] ? parseFloat(parts[3]) : 1426;
				const unit = parts[4] ?? 'vw';

				const a = (to - from) / (mediaTo - mediaFrom);
				const b = from - a * mediaFrom;

				const slope = `${fmt(a * 100)}${unit}`;
				const intercept = b >= 0
					? `+ ${fmt(b)}px`
					: `- ${fmt(Math.abs(b))}px`;

				return `clamp(${Math.min(from, to)}px, ${slope} ${intercept}, ${Math.max(from, to)}px)`;
			}
		);
	}
});
module.exports.postcss = true;