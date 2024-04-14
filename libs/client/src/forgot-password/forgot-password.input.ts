export interface ForgotPasswordRequestCreateInput {
  username: string;
}

export interface ForgotPasswordRequestRedeemInput {
  requestCode: string;
  newPassword: string;
}