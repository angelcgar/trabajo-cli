#!/usr/bin/env bun

import { yarg } from './config/plugins/yargs.plugin';
import { ServerApp } from './presentation/server-app';

(async () => {
	main();
})();

export async function main() {
	console.log('trabajo');

	const { n: nombre_curso, d: dolar, p: peso, f: file } = yarg;

	ServerApp.run({ nombre_curso, dolar, peso, file });
}
