export interface CreateRowUseCase {
	execute(options: CreateRowOptions): string;
}

export interface CreateRowOptions {
	nombre_curso: string;
	dolar?: number;
	peso?: number;
}

export class CreateRow implements CreateRowUseCase {
	execute({ nombre_curso, dolar = 0, peso = 0 }: CreateRowOptions): string {
		const currentDay = new Date().getDate().toString().padStart(2, '0');
		const currentMonth = new Date().getMonth();
		const currentYear = new Date().getFullYear();

		const monthFormatted = (currentMonth + 1).toString().padStart(2, '0');

		const getFullTime = `${currentDay}-${monthFormatted}-${currentYear}`;

		const dolarFormatted = dolar.toString().padStart(2, ' ');

		const newRow = `${getFullTime} | ${nombre_curso.padEnd(48, ' ')} | ${dolar} USD       | ${peso} MNX       | xx/xx/xx | xx/xx/xx`;
		return newRow;
	}
}
