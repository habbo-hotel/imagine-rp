import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SessionModule } from '../session/session.module';
import { RPStatsResolver } from './rp-stats.resolver';

@Module({
  imports: [DatabaseModule, SessionModule],
  providers: [RPStatsResolver],
})
export class RPStatsModule { }
