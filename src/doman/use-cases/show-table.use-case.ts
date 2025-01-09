import { Database, type SQLQueryBindings } from 'bun:sqlite';
import { truncateString } from '../../utils';

interface ShowTableUseCase {
	execute: (showTableOptions: ShowTableOptions) => void;
}

export interface ShowTableOptions {
	show: boolean;
}

interface Data {
	id: number;
	fecha_compra: string;
	name_course: string;
	dolar: string;
	peso: string;
}
export class ShowTable implements ShowTableUseCase {
	private db = new Database('prueba.db', { readonly: true });
	private nameDB = 'data';

	execute({ show }: ShowTableOptions): void {
		const query = this.db.prepare<Data, SQLQueryBindings[]>(
			`SELECT * FROM ${this.nameDB} ORDER BY id`,
		);

		console.log(
			'ID'.padEnd(3, ' '),
			'FECHA_COMPRA'.padEnd(25, ' '),
			'NOMBRE CURSO',
			'DOLAR',
			'PESO',
		);
		console.log('-'.repeat(52));
		for (const element of query.all()) {
			console.log(
				element.id.toString().padEnd(3, ' '),
				element.fecha_compra.padEnd(25, ' '),
				truncateString(element.name_course, 10).padEnd(11, ' '),
				element.dolar.padEnd(6, ' '),
				element.peso,
			);
		}
	}
}
