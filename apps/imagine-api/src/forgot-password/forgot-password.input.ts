import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ForgotPasswordRequestCreateInput {
  @Field(() => String)
  username!: string;
}

@InputType()
export class ForgotPasswordRequestRedeemInput {
  @Field(() => String)
  requestCode!: string;

  @Field(() => String)
  newPassword!: string;
}
