import { styleText } from 'node:util';

export class Logger {
	log(message: string) {
		console.log(message);
	}

	info(message: string) {
		console.log(styleText(['blue'], message));
	}

	success(message: string) {
		console.log(styleText(['green', 'bold'], message));
	}

	warn(message: string) {
		console.log(styleText(['yellow'], message));
	}

	error(message: string) {
		console.log(styleText(['red', 'bold'], message));
	}
}
