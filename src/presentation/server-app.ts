import { CreateRow } from '../doman/use-cases/create-row.use-case';
import { SaveFile } from '../doman/use-cases/save-file.use-case';
import { SaveTable } from '../doman/use-cases/save-table.use-case';

interface RunOptions {
	nombre_curso: string;
	dolar?: number;
	peso?: number;
	file?: string;
	sqlite?: string;
}

// * Aqui logica de negocio
export class ServerApp {
	static run({ nombre_curso, dolar, peso, file, sqlite }: RunOptions) {
		console.log('Logica con sqlite');
		new SaveTable().execute({ nombre_curso, dolar, peso });

		if (file) {
			console.log('Logica con file');
			const row = new CreateRow().execute({ nombre_curso, dolar, peso });
			const result = new SaveFile().execute({ row, file });
			console.log(result);
		}
		// console.log({ row });

		// console.log({ row, file });
		// console.log(result);

		if (sqlite) {
			console.log({ sqlite });
			// const result = new SaveSqlite().execute({})
		}
	}
}
