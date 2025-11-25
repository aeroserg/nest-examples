import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: path.join(process.cwd(), 'db', 'database.sqlite'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
};
