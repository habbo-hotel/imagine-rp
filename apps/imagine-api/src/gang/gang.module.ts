import {Module} from '@nestjs/common';
import {DatabaseModule} from '../database/database.module';
import {SessionModule} from '../session/session.module';
import {GangResolver} from './gang.resolver';

@Module({
  imports: [DatabaseModule, SessionModule],
  providers: [GangResolver],
})
export class GangModule {}
