import { appendFileSync, existsSync, writeFileSync } from 'node:fs';

export interface SaveFileUseCase {
	execute(options: SaveFileOptions): boolean;
}

export interface SaveFileOptions {
	row: string;
	file?: string;
}

export class SaveFile implements SaveFileUseCase {
	execute({ row, file = './output.txt' }: SaveFileOptions): boolean {
		const titleHeadMd = `Tabla de registro de cursos

Fecha      | Curso                                            | Precio (USD)  | Precio (MXN)  | inicio   | final
-----------|--------------------------------------------------|---------------|---------------|----------|---------\n`;

		console.log('File saved');
		try {
			if (existsSync(file)) {
				appendFileSync(file, `${row}\n`, 'utf-8');
				console.log('Línea añadida correctamente.');
			} else {
				writeFileSync(file, titleHeadMd, 'utf8');
				appendFileSync(file, `${row}\n`, 'utf-8');
				console.log('Archivo creado.');
			}

			return true;
		} catch (error) {
			console.log('Error: ', error);
			return false;
		}
	}
}
