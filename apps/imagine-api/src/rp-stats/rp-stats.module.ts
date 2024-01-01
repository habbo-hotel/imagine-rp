import {Module} from '@nestjs/common';
import {DatabaseModule} from '../database/database.module';
import {SessionModule} from '../session/session.module';
import {RPStatsResolver} from './rp-stats.resolver';
import {registerEnumType} from '@nestjs/graphql';
import {RPStatsOrderBy} from './rp-stats.input';

@Module({
  imports: [DatabaseModule, SessionModule],
  providers: [RPStatsResolver],
})
export class RPStatsModule {}

registerEnumType(RPStatsOrderBy, {
  name: 'RPStatsOrderBy',
});
