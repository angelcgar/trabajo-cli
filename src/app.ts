#!/usr/bin/env bun

import { yarg } from './config/plugins/yargs.plugin';
import { ServerApp } from './presentation/server-app';

(async () => {
	main();
})();

export async function main() {
	console.log('hola mundo');

	const { n: nombre_curso, d: dolar, p: peso } = yarg;

	ServerApp.run({ nombre_curso, dolar, peso });
}
