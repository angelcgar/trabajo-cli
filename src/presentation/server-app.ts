import { CreateRow } from "../doman/use-cases/create-row.use-case";
import { SaveFile } from "../doman/use-cases/save-file.use-case";

interface RunOptions {
	nombre_curso: string;
}

export class ServerApp {
	static run({ nombre_curso }: RunOptions) {
		const row = new CreateRow().execute({ nombre_curso });
		console.log({ row });

		const result = new SaveFile().execute({ nombre_curso: row });
		console.log(result);
	}
}
