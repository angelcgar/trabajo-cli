import { existsSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { Logger } from '../../config/plugins/logger.plugin';

export class ProductionCLI {
	constructor(private logger: Logger = new Logger()) {}

	public readonly nameDb = 'production';
	public padDataBase = join(homedir(), `.config/trabajo/${this.nameDb}.db`);

	execute() {
		if (!existsSync(join(homedir(), '.config/trabajo'))) {
			this.logger.error('No existe el directorio de configuracion');
			this.logger.info('Se creara la ruta de configuracion');

			mkdirSync(join(homedir(), '.config/trabajo'));
			this.logger.log('Se ha creado una ruta de configuracion');
		}
	}
}
