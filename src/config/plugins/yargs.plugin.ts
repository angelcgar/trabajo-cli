import yargs from 'yargs';

import { hideBin } from 'yargs/helpers';

export const yarg = yargs(hideBin(process.argv))
	.option('n', {
		alias: 'nombre_curso',
		type: 'string',
		demandOption: true,
		describe: 'Nombre del curso',
	})
	.option('d', {
		alias: 'dolar',
		type: 'number',
		describe: 'price in dolar',
	})
	.option('p', {
		alias: 'peso',
		type: 'number',
		describe: 'preci in peso mexicano',
	})
	.version('0.0.1')
	.check((argv, option) => {
		return true;
	})
	.parseSync();
