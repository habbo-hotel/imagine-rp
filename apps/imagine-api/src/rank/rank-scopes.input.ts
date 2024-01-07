import {Field, InputType, PartialType} from '@nestjs/graphql';
import {RankScopesWire} from '@imagine-cms/types';
import {IsBoolean} from 'class-validator';

@InputType()
export class RankWireScopesCreateInput implements RankScopesWire {
  @Field()
  @IsBoolean()
  accessAdminPanel!: boolean;

  @Field()
  @IsBoolean()
  manageArticles!: boolean;

  @Field()
  @IsBoolean()
  manageUsers!: boolean;

  @Field()
  @IsBoolean()
  manageRooms!: boolean;

  @Field({nullable: true})
  manageBetaCodes!: boolean;

  @Field()
  @IsBoolean()
  managePermissions!: boolean;

  @Field()
  @IsBoolean()
  manageSupportTickets!: boolean;

  @Field()
  @IsBoolean()
  manageStaffApplications!: boolean;

  @Field()
  @IsBoolean()
  manageSite!: boolean;

  @Field()
  @IsBoolean()
  manageRadioRequests!: boolean;

  @Field()
  @IsBoolean()
  manageBugReports!: boolean;

  @Field()
  @IsBoolean()
  manageBans!: boolean;

  @Field()
  @IsBoolean()
  manageChatlogs!: boolean;

  @Field()
  @IsBoolean()
  manageGroups!: boolean;

  @Field()
  @IsBoolean()
  manageLanguages!: boolean;

  @Field()
  @IsBoolean()
  manageRanks!: boolean;

  @Field()
  @IsBoolean()
  manageWordFilter!: boolean;

  @Field()
  @IsBoolean()
  manageStore!: boolean;

  @Field()
  @IsBoolean()
  useNavigation!: boolean;
}

@InputType()
export class RankWireScopesUpdateInput extends PartialType(
  RankWireScopesCreateInput
) {}
