import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SessionModule } from '../session/session.module';
import { GangRankResolver } from './gang-rank.resolver';

@Module({
  imports: [DatabaseModule, SessionModule],
  providers: [GangRankResolver],
})
export class GangRankModule { }
