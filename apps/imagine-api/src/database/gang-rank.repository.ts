import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../utility/base.repository';
import { GangRankEntity } from './gang-rank.entity';

@Injectable()
export class GangRankRepository extends BaseRepository<GangRankEntity> {
  constructor(
    @InjectRepository(GangRankEntity)
    gangRankRepo: Repository<GangRankEntity>
  ) {
    super(gangRankRepo);
  }
}
