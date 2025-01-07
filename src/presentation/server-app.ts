import { CreateRow } from '../doman/use-cases/create-row.use-case';
import { SaveFile } from '../doman/use-cases/save-file.use-case';

interface RunOptions {
	nombre_curso: string;
	dolar?: number;
	peso?: number;
}

export class ServerApp {
	static run({ nombre_curso, dolar, peso }: RunOptions) {
		const row = new CreateRow().execute({ nombre_curso, dolar, peso });
		console.log({ row });

		const result = new SaveFile().execute({ nombre_curso: row });
		console.log(result);
	}
}