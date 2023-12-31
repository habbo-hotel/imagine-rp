import {Module} from '@nestjs/common';
import {DatabaseModule} from '../database/database.module';
import {SessionModule} from '../session/session.module';
import {GangMemberResolver} from './gang-member.resolver';

@Module({
  imports: [DatabaseModule, SessionModule],
  providers: [GangMemberResolver],
})
export class GangMemberModule {}
