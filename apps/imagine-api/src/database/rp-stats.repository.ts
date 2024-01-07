import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {BaseRepository} from '../utility/base.repository';
import {RPStatsChangeEntity, RPStatsEntity} from './rp-stats.entity';

@Injectable()
export class RPStatsRepository extends BaseRepository<RPStatsEntity> {
  constructor(
    @InjectRepository(RPStatsEntity)
    rpStatsRepo: Repository<RPStatsEntity>
  ) {
    super(rpStatsRepo);
  }
}

@Injectable()
export class RPStatsChangeRepository extends BaseRepository<RPStatsChangeEntity> {
  constructor(
    @InjectRepository(RPStatsChangeEntity)
    rpStatsRepo: Repository<RPStatsChangeEntity>
  ) {
    super(rpStatsRepo);
  }
}
