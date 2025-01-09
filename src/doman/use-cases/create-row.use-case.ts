import { currencyFormat, getFullTime } from '../../utils';

export interface CreateRowUseCase {
	execute(options: CreateRowOptions): string;
}

export interface CreateRowOptions {
	nombre_curso: string;
	dolar?: number;
	peso?: number;
}

// * Aqui logica de APP
export class CreateRow implements CreateRowUseCase {
	execute({ nombre_curso, dolar = 0, peso = 0 }: CreateRowOptions): string {
		const newRow = `${getFullTime} | ${nombre_curso.padEnd(48, ' ')} |         ${currencyFormat(dolar)} |        ${currencyFormat(peso)} | xx/xx/xx | xx/xx/xx`;

		return newRow;
	}
}
