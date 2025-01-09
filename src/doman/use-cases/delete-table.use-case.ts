import { Database } from 'bun:sqlite';

import { Logger } from '../../config/plugins/logger.plugin';

interface DeleteTableUseCase {
	execute: (deleteTableOptions: DeleteTableOptions) => void;
}

interface DeleteTableOptions {
	delete_row: number;
}

export class DeleteTable implements DeleteTableUseCase {
	constructor(private logger: Logger = new Logger()) {}

	private db = new Database('prueba.db');
	private nameDB = 'data';

	execute({ delete_row }: DeleteTableOptions): void {
		const querySQL = `DELETE FROM ${this.nameDB} WHERE id = ${delete_row};`;
		try {
			this.db.run(querySQL);
			this.logger.success('Celda eliminada');
		} catch (error) {
			this.logger.error(`Error: ${error}`);
		}
	}
}
