import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CorporationEntity } from './corporation.entity';
import { BaseRepository } from '../utility/base.repository';

@Injectable()
export class CorporationRepository extends BaseRepository<CorporationEntity> {
  constructor(
    @InjectRepository(CorporationEntity)
    gangRepo: Repository<CorporationEntity>
  ) {
    super(gangRepo);
  }
}
