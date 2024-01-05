import {ObjectType} from '@nestjs/graphql';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {RankFlagsWire, RankScopesWire} from '@imagine-cms/types';

@Entity('ranks')
@ObjectType()
export class RankEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({name: 'badgeid'})
  badgeCode!: string;

  @Column({name: 'tab_colour'})
  backgroundColor!: string;

  @Column({type: 'json'})
  scopes!: RankScopesWire;

  @Column({type: 'json'})
  flags!: RankFlagsWire;
}
