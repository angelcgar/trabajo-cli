import { Database, type SQLQueryBindings } from 'bun:sqlite';

import { Logger } from '../../config/plugins/logger.plugin';
import { truncateString } from '../../utils';

interface UpdateTableUseCase {
	execute: (updateTableOptions: UpdateTableOptions) => void;
}

interface UpdateTableOptions {
	update_cell: (string | number)[];
}

interface Data {
	id: number;
	fecha_compra: string;
	name_course: string;
	dolar: string;
	peso: string;
}

export class UpdateTable implements UpdateTableUseCase {
	constructor(private logger: Logger = new Logger()) {}

	private db = new Database('prueba.db', { readwrite: true });
	private nameDB = 'data';

	execute({ update_cell }: UpdateTableOptions): void {
		const columName = update_cell[0];
		const cellNewValue = update_cell[1].toString();
		const idWhereModifid = update_cell[2].toString();
		const querySQL = `UPDATE ${this.nameDB} SET ${columName} = ${cellNewValue} WHERE id = ${idWhereModifid}`;

		try {
			const query = this.db.prepare<Data, SQLQueryBindings[]>(querySQL);
			console.log(
				'ID'.padEnd(3, ' '),
				'FECHA_COMPRA'.padEnd(25, ' '),
				'NOMBRE CURSO',
				'DOLAR',
				'PESO',
			);
			console.log('-'.repeat(52));
			const y = this.db.prepare<Data, SQLQueryBindings[]>(
				'SELECT * FROM data WHERE id = ?',
			);
			for (const element of y.all(idWhereModifid)) {
				console.log(
					element.id.toString().padEnd(3, ' '),
					element.fecha_compra.padEnd(25, ' '),
					truncateString(element.name_course, 10).padEnd(11, ' '),
					element.dolar.padEnd(6, ' '),
					element.peso,
				);
			}
			this.logger.success('Update cell');
			return;
		} catch (error) {
			this.logger.error(`Error: ${error}`);
		}
	}
}
