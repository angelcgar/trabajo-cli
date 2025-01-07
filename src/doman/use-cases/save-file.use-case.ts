import { appendFileSync } from 'node:fs';

export interface SaveFileUseCase {
	execute(options: SaveFileOptions): boolean;
}

export interface SaveFileOptions {
	nombre_curso: string;
}

export class SaveFile implements SaveFileUseCase {
	execute({ nombre_curso }: SaveFileOptions): boolean {
		console.log('File saved');
		try {
			appendFileSync('./output.txt', `\n${nombre_curso}`);
			return true;
		} catch (error) {
			console.log('Error: ', error);
			return false;
		}
	}
}
