import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SessionModule } from '../session/session.module';
import { CorporationRankResolver } from './corporation-rank.resolver';

@Module({
  imports: [DatabaseModule, SessionModule],
  providers: [CorporationRankResolver],
})
export class CorporationRankModule { }
