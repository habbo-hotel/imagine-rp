import {Module} from '@nestjs/common';
import {UserOrderBy} from './user.input';
import {UserService} from './user.service';
import {UserResolver} from './user.resolver';
import {registerEnumType} from '@nestjs/graphql';
import {CommonModule} from '../common/common.module';
import {SessionModule} from '../session/session.module';
import {DatabaseModule} from '../database/database.module';
import { GovernmentModule } from '../government/government.module';

@Module({
  imports: [CommonModule, DatabaseModule, SessionModule, GovernmentModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}

registerEnumType(UserOrderBy, {
  name: 'UserOrderBy',
});
