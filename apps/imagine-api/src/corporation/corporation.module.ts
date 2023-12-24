import {Module} from '@nestjs/common';
import {DatabaseModule} from '../database/database.module';
import {SessionModule} from '../session/session.module';
import {CorporationResolver} from './corporation.resolver';

@Module({
  imports: [DatabaseModule, SessionModule],
  providers: [CorporationResolver],
})
export class CorporationModule {}
