import yargs from 'yargs';

import { hideBin } from 'yargs/helpers';

export const yarg = yargs(hideBin(process.argv))
	.option('n', {
		alias: 'nombre_curso',
		type: 'string',
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
	.option('f', {
		alias: 'file',
		type: 'string',
		describe: 'file destination',
	})
	.option('sqlite', {
		type: 'count',
		describe: 'sql',
	})
	.option('s', {
		alias: 'show',
		type: 'boolean',
		describe: 'show data of table',
	})
	.option('update_cell', {
		type: 'array',
		describe:
			'update a cell value, colum_name new_value where_id (dolar 12.60 3)',
	})
	.version('0.0.2')
	.check((argv, option) => {
		return true;
	})
	.parseSync();
