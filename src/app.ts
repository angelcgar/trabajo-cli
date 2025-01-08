#!/usr/bin/env bun

import { yarg } from './config/plugins/yargs.plugin';
import { ServerApp } from './presentation/server-app';

(async () => {
	main();
})();

export async function main() {
	console.log('trabajo CLI');

	const { n: nombre_curso, d: dolar, p: peso, f: file, sqlite } = yarg;

	ServerApp.run({ nombre_curso, dolar, peso, file, sqlite });
}
