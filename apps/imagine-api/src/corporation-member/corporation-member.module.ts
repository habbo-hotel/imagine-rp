import {Module} from '@nestjs/common';
import {DatabaseModule} from '../database/database.module';
import {SessionModule} from '../session/session.module';
import {CorporationMemberResolver} from './corporation-member.resolver';

@Module({
  imports: [DatabaseModule, SessionModule],
  providers: [CorporationMemberResolver],
})
export class CorporationMemberModule {}
