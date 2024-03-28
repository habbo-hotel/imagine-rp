import {ObjectType} from '@nestjs/graphql';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {RankFlagsWire, RankScopesWire} from '@imagine-cms/types';

@Entity('permission_groups')
@ObjectType()
export class RankEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({name: 'badge'})
  badgeCode!: string;

  @Column({name: 'prefix_color'})
  backgroundColor!: string;

  @Column({type: 'json'})
  scopes!: RankScopesWire;

  @Column({type: 'json'})
  flags!: RankFlagsWire;
}
