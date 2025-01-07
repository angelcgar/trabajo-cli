#!/usr/bin/env bun

// import { positionals, values } from './config/plugins/parse.plugin';
import './config/plugins/yargs.plugin';

import { yarg } from './config/plugins/yargs.plugin';
import { ServerApp } from './presentation/server-app';

(async () => {
	main();
})();

export async function main() {
	console.log('hola mundo!!!!!');

	const t = yarg;
	console.log(t.n);

	// console.log({ values: values.nombre_curso, positionals });

	// ServerApp.run({ nombre_curso: values.nombre_curso! });
}
