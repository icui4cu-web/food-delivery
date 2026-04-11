document.querySelectorAll('.expandable').forEach(container => {
	const btn = container.querySelector('[data-expandable-trigger]');
	if (!btn) return;

	const collapseText = btn.dataset.collapseText;
	const textNode = [...btn.childNodes].find(n => n.nodeType === Node.TEXT_NODE);
	const originalText = textNode?.textContent;

	btn.addEventListener('click', () => {
		const isExpanded = container.classList.toggle('_expanded');

		if (textNode) {
			textNode.textContent = isExpanded ? collapseText : originalText;
		}
	});
});