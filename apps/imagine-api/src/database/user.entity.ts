import {registerEnumType} from '@nestjs/graphql';
import {UserGender, UserOnlineStatus} from '@imagine-cms/types';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {
  IMAGINE_DEFAULT_ACTIVITY_POINTS,
  IMAGINE_DEFAULT_CREDITS,
  IMAGINE_DEFAULT_HOME_ROOM,
  IMAGINE_DEFAULT_LOOK,
  IMAGINE_DEFAULT_MOTTO,
  IMAGINE_DEFAULT_VIP_POINTS,
} from '../imagine.constant';

registerEnumType(UserGender, {
  name: 'UserGender',
});

registerEnumType(UserOnlineStatus, {
  name: 'UserOnlineStatus',
});

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({unique: true})
  username!: string;

  @Column({nullable: true})
  password?: string;

  @Column({name: 'mail', nullable: true})
  email?: string;

  @Column({name: 'auth_ticket', nullable: true})
  gameSSO?: string;

  @Column({name: 'rank', type: 'int'})
  rankID: number = 1;

  @Column()
  credits: number = IMAGINE_DEFAULT_CREDITS;

  @Column({name: 'vip_points'})
  vipPoints: number = IMAGINE_DEFAULT_VIP_POINTS;

  @Column({name: 'activity_points'})
  activityPoints: number = IMAGINE_DEFAULT_ACTIVITY_POINTS;

  @Column()
  look: string = IMAGINE_DEFAULT_LOOK;

  @Column({type: 'int'})
  gender!: UserGender;

  @Column()
  motto: string = IMAGINE_DEFAULT_MOTTO;

  @Column({name: 'account_created'})
  accountCreatedAt!: number;

  @Column({name: 'online', type: 'int'})
  onlineStatus: UserOnlineStatus = UserOnlineStatus.Offline;

  @Column({name: 'last_online'})
  lastOnlineAt!: number;

  @Column({name: 'ip_last'})
  ipLast!: string;

  @Column({name: 'ip_reg'})
  ipRegistered!: string;

  @Column({name: 'machine_id', nullable: true})
  machineAddress?: string;

  @Column({name: 'home_room'})
  homeRoomID: number = IMAGINE_DEFAULT_HOME_ROOM;

  @Column({name: 'google_id', type: 'varchar', nullable: true})
  googleID?: string;

  @Column({name: 'facebook_id', type: 'varchar', nullable: true})
  facebookID?: string;

  @Column({name: 'discord_user_id', type: 'varchar', nullable: true})
  discordID?: string;

  @Column({name: 'lang', type: 'varchar', nullable: true})
  language?: string;
}
