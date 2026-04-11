import { readdir, readFile, writeFile } from 'fs/promises'
import { join, relative, dirname } from 'path'

const DIST = './dist'
const FOLDERS = ['assets', 'demo-content', 'media']
const pattern = new RegExp(`(['\"\\s(])\\/(${FOLDERS.join('|')})\\/`, 'g')

async function* walk(dir) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const path = join(dir, entry.name)
		if (entry.isDirectory()) yield* walk(path)
		else if (/\.(html|css)$/.test(entry.name)) yield path
	}
}

for await (const file of walk(DIST)) {
	let content = await readFile(file, 'utf8')
	const depth = relative(DIST, dirname(file)).split('/').filter(Boolean).length
	const prefix = depth > 0 ? '../'.repeat(depth) : './'

	content = content.replace(pattern, (_, quote, folder) => `${quote}${prefix}${folder}/`)

	await writeFile(file, content)
}