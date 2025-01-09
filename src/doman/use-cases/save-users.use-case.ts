import { Database } from 'bun:sqlite';

import { generateHash } from '../../utils';

interface SaveUserUseCase {
	execute: (saveUserOtions: SaveUserOptions) => void;
}

interface SaveUserOptions {
	password: string;
	user: string;
}

export class SaveUser implements SaveUserUseCase {
	public db = new Database();

	execute(saveUserOtions: SaveUserOptions): void {
		throw new Error('metodo no implementado');
	}
	example() {
		// * Ejemplo simple para users

		// Crear una tabla para usuarios
		this.db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password_hash TEXT NOT NULL
  );
`);

		// Ejemplo: agregar un usuario
		this.exampleAddUser('usuario1', 'miPassword123');

		const secret = 'abcdefg';
		// * logica sin usar la db
		// const hash = this.generateHash('holamundo', secret);
		// console.log(hash);

		// // compare
		// const hashedPassword = this.generateHash('holamundo', secret);

		// if (hash === hashedPassword) {
		// 	console.log('Autenticación exitosa.');
		// } else {
		// 	console.log('Autenticación fallida.');
		// }
	}

	exampleAddUser(username: string, password: string) {
		const secret = 'miClaveSecreta';
		const hashedPassword = this.generateHash(password, secret);

		const stmt = this.db.prepare(
			'INSERT INTO users (username, password_hash) VALUES (?, ?)',
		);
		stmt.run(username, hashedPassword);
		console.log(`Usuario ${username} agregado con éxito.`);
	}

	generateHash(text: string, secret: string) {
		return generateHash(text, secret);
	}

	authenticateUser(username: string, password: string) {
		// * logica usando la db
		const secret = 'miClaveSecreta';
		const hashedPassword = this.generateHash(password, secret);

		const stmt = this.db.prepare(
			'SELECT password_hash FROM users WHERE username = ?',
		);
		const user = stmt.get(username);

		if (user && user.password_hash === hashedPassword) {
			console.log('Autenticación exitosa.');
			return true;
			// biome-ignore lint/style/noUselessElse: <explanation>
		} else {
			console.log('Autenticación fallida.');
			return false;
		}
	}
}
