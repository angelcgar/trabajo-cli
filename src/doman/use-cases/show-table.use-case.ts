import { Database, type SQLQueryBindings } from 'bun:sqlite';

interface ShowTableUseCase {
	execute: (showTableOptions: ShowTableOptions) => void;
}

export interface ShowTableOptions {
	show: boolean;
}

interface data {
	id: number;
	fecha_compra: string;
	name_course: string;
}

export class ShowTable implements ShowTableUseCase {
	public db = new Database('prueba.db', { readonly: true });

	private nameDB = 'data';

	execute({ show }: ShowTableOptions): void {
		const query = this.db.prepare<data, SQLQueryBindings[]>(
			`SELECT * FROM ${this.nameDB} ORDER BY id`,
		);
		// biome-ignore lint/complexity/noForEach: <explanation>
		query.all().forEach((d) => {
			// console.log(
			// 	d.id.toString().padEnd(3, ' '),
			// 	d.fecha_compra.padEnd(25, ' '),
			// 	d.name_course,
			// );
		});

		console.log(
			'id'.padEnd(3, ' '),
			'fecha_compra'.padEnd(25, ' '),
			'nombre curso',
		);
		console.log('-'.repeat(42));
		for (const element of query.all()) {
			console.log(
				element.id.toString().padEnd(3, ' '),
				element.fecha_compra.padEnd(25, ' '),
				element.name_course,
			);
		}
	}
}
