import { CreateRow } from '../doman/use-cases/create-row.use-case';
import { SaveFile } from '../doman/use-cases/save-file.use-case';
import { SaveTable } from '../doman/use-cases/save-table.use-case';
import { ShowTable } from '../doman/use-cases/show-table.use-case';

interface RunOptions {
	nombre_curso?: string;
	dolar?: number;
	peso?: number;
	file?: string;
	sqlite?: number;
	show?: boolean;
}

// * Aqui logica de negocio
export class ServerApp {
	static run({
		nombre_curso,
		dolar,
		peso,
		file,
		sqlite,
		show,
	}: RunOptions): void {
		if (nombre_curso) {
			console.log('\x1b[34m%s\x1b[0m', 'Logica con sqlite');
			new SaveTable().execute({ nombre_curso, dolar, peso });
		}

		if (nombre_curso) {
			console.log('\x1b[34m%s\x1b[0m', 'Logica con file');
			const row = new CreateRow().execute({ nombre_curso, dolar, peso });
			const result = new SaveFile().execute({ row, file });
			// console.log(result);
		}
		// console.log({ row });

		// console.log({ row, file });
		// console.log(result);

		if (sqlite) {
			console.log({ sqlite });
			// const result = new SaveSqlite().execute({})
		}

		if (show) {
			console.log('\x1b[34m%s\x1b[0m', 'Show data of DB');
			new ShowTable().execute({ show });
		}
	}
}
