import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../utility/base.repository';
import { CorporationRankEntity } from './corporation-rank.entity';

@Injectable()
export class CorporationRankRepository extends BaseRepository<CorporationRankEntity> {
  constructor(
    @InjectRepository(CorporationRankEntity)
    corporationRankRepo: Repository<CorporationRankEntity>
  ) {
    super(corporationRankRepo);
  }
}
