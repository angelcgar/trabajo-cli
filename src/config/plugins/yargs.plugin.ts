import yargs from 'yargs';

import { hideBin } from 'yargs/helpers';

export const yarg = yargs(hideBin(process.argv))
	.option('n', {
		alias: 'nombre_curso',
		type: 'string',
		demandOption: true,
		describe: 'Nombre del curso',
	})
	.version('0.0.1')
	.check((argv, option) => {
		return true;
	})
	.parseSync();
