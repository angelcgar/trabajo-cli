import { Database } from 'bun:sqlite';

import { currencyFormat } from '../../utils/currencyFormat';
import { getFullTime } from '../../utils';

import { ProductionCLI } from './production-cli.use-case';
import { Logger } from '../../config/plugins/logger.plugin';

interface SaveTableUseCase {
	execute: (options: SaveTableOptions) => void;
}

export interface SaveTableOptions {
	nombre_curso: string;
	dolar?: number;
	peso?: number;
}

export class SaveTable implements SaveTableUseCase {
	constructor(private logger: Logger = new Logger()) {}

	private productionCLI: ProductionCLI = new ProductionCLI();

	private db = new Database(this.productionCLI.padDataBase, { create: true });
	private nameDB = this.productionCLI.nameDb;

	public dolarTemp?: string;
	public pesoTemp?: string;

	execute({ nombre_curso, dolar, peso }: SaveTableOptions): void {
		console.log(this.productionCLI.padDataBase, this.productionCLI.nameDb);
		this.db.exec(`
		  CREATE TABLE IF NOT EXISTS ${this.nameDB} (
			id INTEGER PRIMARY KEY,
			uuid TEXT NOT NULL,
			fecha_compra TEXT NOT NULL,
			name_course TEXT NOT NULL,
			dolar TEXT,
			peso TEXT
		) STRICT;
		`);

		this.dolarTemp = dolar?.toString() ?? '0';
		this.pesoTemp = peso?.toString() ?? '0';

		const insert = this.db.prepare(
			`INSERT INTO ${this.nameDB} (uuid, fecha_compra, name_course, dolar, peso) VALUES ( ?, ?, ?, ?, ? )`,
		);
		insert.run(
			this.generateHash(),
			getFullTime,
			nombre_curso,
			currencyFormat(+this.dolarTemp),
			currencyFormat(+this.pesoTemp),
		);

		// const query = this.db.prepare(`SELECT * FROM ${this.nameDB} ORDER BY id`);

		this.logger.success('Save in Table');
	}

	generateHash() {
		return crypto.randomUUID();
	}
}
