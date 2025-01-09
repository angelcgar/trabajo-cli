import { Logger } from '../config/plugins/logger.plugin';
import { CreateRow } from '../doman/use-cases/create-row.use-case';
import { DeleteTable } from '../doman/use-cases/delete-table.use-case';
import { ProductionCLI } from '../doman/use-cases/production-cli.use-case';
import { SaveFile } from '../doman/use-cases/save-file.use-case';
import { SaveTable } from '../doman/use-cases/save-table.use-case';
import { ShowTable } from '../doman/use-cases/show-table.use-case';
import { UpdateTable } from '../doman/use-cases/update-table.use-case';

interface RunOptions {
	nombre_curso?: string;
	dolar?: number;
	peso?: number;
	file?: string;
	sqlite?: number;
	show?: boolean;
	update_cell?: (string | number)[];
	delete_row?: number;
}

// * Aqui logica de negocio
export class ServerApp {
	constructor(private logger: Logger = new Logger()) {}

	run({
		nombre_curso,
		dolar,
		peso,
		file,
		sqlite,
		show,
		update_cell,
		delete_row,
	}: RunOptions): void {
		// Esto tiene que ser un middlewere
		new ProductionCLI().execute();

		if (nombre_curso) {
			console.log('\x1b[34m%s\x1b[0m', 'Logica con sqlite');
			new SaveTable().execute({ nombre_curso, dolar, peso });
		}

		if (nombre_curso && file) {
			console.log('\x1b[34m%s\x1b[0m', 'Logica con file');
			const row = new CreateRow().execute({ nombre_curso, dolar, peso });
			const result = new SaveFile().execute({ row, file });
		}

		if (sqlite) {
			console.log({ sqlite });
		}

		if (show) {
			console.log('\x1b[34m%s\x1b[0m', 'Show data of DB');
			new ShowTable().execute({ show });
		}

		if (update_cell) {
			if (typeof update_cell[0] !== 'string') {
				console.log('El primer argumento debe ser el nombre de la columna');
				return;
			}
			console.log('\x1b[34m%s\x1b[0m', 'Update DB');

			new UpdateTable().execute({ update_cell });
		}

		if (delete_row) {
			if (typeof delete_row !== 'number') {
				return;
			}
			new DeleteTable().execute({ delete_row });
		}
	}
}
