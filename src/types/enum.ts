export enum ErrorCode {
  Unknown_Error = 'Unknown_Error',
  Invalid_Input = 'Invalid_Input',
  Missing_Access_Token_In_Header = 'Missing_Access_Token_In_Header',
  Token_Expired = 'Token_Expired',
  Refresh_Token_Expired = 'Refresh_Token_Expired',
  Email_Address_Not_Exist = 'Email_Address_Not_Exist',
  Email_Address_Already_Exist = 'Email_Address_Already_Exist',
  User_Blocked = 'User_Blocked',
  Password_Incorrect = 'Password_Incorrect',
  User_Not_Found = 'User_Not_Found',
  Wrong_Admin_Token = 'Wrong_Admin_Token',
  Not_Found = 'Not_Found',
}

export enum TokenType {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}

export enum CommonStatus {
  ACTIVE = 1,
  INACTIVE = 0,
}

export enum ContactState {
  RESOLVED = 1,
  PENDING = 2,
  REJECT = 3,
}

export enum UserStatus {
  ACTIVE = 1,
  INACTIVE = 0,
}

export enum ForgotPasswordStatus {
  ACTIVE = 1,
  USED = 0,
}

export enum TransactionHistoryStatus {
  ACTIVE = 1,
  USED = 0,
}

export enum IsPublicProfile {
  PUBLIC = 1,
  NOT_PUBLIC = 0,
}

export enum FavoriteStatus {
  LIKE = 1,
  DISLIKE = 2,
  NONE = 0,
}

export enum Token {
  SOLANA = 'SOLANA',
  USDT = 'USDT',
  RACEFI = 'RACEFI',
}
