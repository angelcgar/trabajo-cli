export interface CreateRowUseCase {
	execute(options: CreateRowOptions): string;
}

export interface CreateRowOptions {
	nombre_curso: string;
}

export class CreateRow implements CreateRowUseCase {
	execute({ nombre_curso }: CreateRowOptions): string {
		const currentDay = new Date().getDate().toString().padStart(2, '0');
		const currentMonth = new Date().getMonth();
		const currentYear = new Date().getFullYear();

		const monthFormatted = (currentMonth + 1).toString().padStart(2, '0');

		const getFullTime = `${currentDay}-${monthFormatted}-${currentYear}`;
		console.log({ getFullTime });

		const newRow = `xx-xx-xxxx | ${nombre_curso.padEnd(48, ' ')} | [Precio USD] | [Precio MNX] | xx/xx/xx | xx/xx/xx`;
		return newRow;
	}
}
