import {UserEntity} from './user.entity';
import {PhotoWire} from '@imagine-cms/types';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('cms_user_photos')
export class PhotoEntity implements PhotoWire {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({name: 'user_id'})
  userID!: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({name: 'user_id'})
  user?: UserEntity;

  @Column({name: 'image_url'})
  photoURL!: string;

  @Column({name: 'date'})
  createdAt!: number;
}
