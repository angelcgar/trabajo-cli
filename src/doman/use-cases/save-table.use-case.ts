import { Database } from 'bun:sqlite';

interface SaveTableUseCase {
	execute: (options: SaveTableOptions) => void;
}

export interface SaveTableOptions {
	nombre_curso: string;
	dolar?: number;
	peso?: number;
}

// const database = new DatabaseSync('prueba.db');
// database.exec(`
//     CREATE TABLE data(
//     key INTEGER PRIMARY KEY,
//     value TEXT
//   ) STRICT
// `);
// const insert = database.prepare(
// 	'INSERT INTO data (key, value) VALUES ( ?, ? )',
// );
// insert.run(1, 'hola');
// insert.run(2, 'mundo');
// const query = database.prepare('SELECT * FROM data ORDER BY key');
// console.log(query.all());

export class SaveTable implements SaveTableUseCase {
	public db = new Database('prueba.db', { create: true });
	public nameDB = 'data';

	execute({ nombre_curso, dolar, peso }: SaveTableOptions): void {
		this.db.exec(`
  CREATE TABLE IF NOT EXISTS ${this.nameDB} (
	id INTEGER PRIMARY KEY,
	fecha_compra TEXT NOT NULL,
	name_course TEXT NOT NULL
) STRICT;
`);
		const eventDate = new Date().toISOString();

		const insert = this.db.prepare(
			`INSERT INTO ${this.nameDB} (fecha_compra, name_course) VALUES ( ?, ? )`,
		);
		insert.run(eventDate, nombre_curso);

		const query = this.db.prepare(`SELECT * FROM ${this.nameDB} ORDER BY id`);

		console.log('\x1b[32m%s\x1b[0m', 'Save in Table');
	}
}
