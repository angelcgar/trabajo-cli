import { appendFileSync, existsSync, writeFileSync } from 'node:fs';

export interface SaveFileUseCase {
	execute(options: SaveFileOptions): boolean;
}

export interface SaveFileOptions {
	row: string;
	file?: string;
}

export class SaveFile implements SaveFileUseCase {
	public filePadSystem = './output.txt';
	public filePad?: string;

	execute({ row, file }: SaveFileOptions): boolean {
		const titleHeadMd = `Tabla de registro de cursos

Fecha      | Curso                                            | Precio (USD)  | Precio (MXN)  | inicio   | final
-----------|--------------------------------------------------|---------------|---------------|----------|---------\n`;

		this.filePad = file ?? this.filePadSystem;
		try {
			if (existsSync(this.filePad)) {
				appendFileSync(this.filePad, `${row}\n`, 'utf-8');
				console.log('\x1b[32m%s\x1b[0m', 'Save in File');
			} else {
				writeFileSync(this.filePad, titleHeadMd, 'utf8');
				appendFileSync(this.filePad, `${row}\n`, 'utf-8');
				console.log('File created and append row.');
			}

			return true;
		} catch (error) {
			console.log('Error: ', error);
			return false;
		}
	}
}
