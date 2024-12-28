export interface User {
  _id: string; // Unique identifier for the user
  username: string; // Username of the user
  email: string; // Email address of the user
  password: string; // Hashed password of the user
  verifyCode: string; // Verification code for account verification
  isVerified: boolean; // Indicates whether the user's account is verified
  verifyCodeExpiry: string; // Expiry date and time for the verification code in ISO format
  Role: string; // Role of the user (e.g., 'admin')
  createdAt: string; // Timestamp of when the user was created in ISO format
  updatedAt: string; // Timestamp of the last update to the user's data in ISO format
  __v: number; // Internal version number (used in MongoDB)
}
