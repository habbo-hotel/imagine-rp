import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { GangEntity } from './gang.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../utility/base.repository';

@Injectable()
export class GangRepository extends BaseRepository<GangEntity> {
  constructor(
    @InjectRepository(GangEntity)
    gangRepo: Repository<GangEntity>
  ) {
    super(gangRepo);
  }
}
