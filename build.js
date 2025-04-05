import {exit} from 'node:process';
import {GasPlugin} from 'esbuild-gas-plugin';
import {build} from 'esbuild';

const buildResult = await build({
	entryPoints: ['src/index.ts'],
	bundle: true,
	minify: false,
	outfile: './dist/index.js',
	plugins: [GasPlugin],
});
if (buildResult.errors.length > 0) {
	for (const error of buildResult.errors) {
		console.error(error);
	}

	exit(1);
}
