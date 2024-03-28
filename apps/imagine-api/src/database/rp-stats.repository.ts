import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {BaseRepository} from '../utility/base.repository';
import {RPStatsEntity} from './rp-stats.entity';

@Injectable()
export class RPStatsRepository extends BaseRepository<RPStatsEntity> {
  constructor(
    @InjectRepository(RPStatsEntity)
    rpStatsRepo: Repository<RPStatsEntity>
  ) {
    super(rpStatsRepo);
  }
}
