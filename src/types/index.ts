export interface Coinslist {
  id: string;
  symbol: string;
  name: string;
  image: string;
}

export interface Roi {
  times: number;
  currency: string;
  percentage: number;
}

export interface SparklineIn7D {
  price: any[];
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  name: string;
}

export interface ForgotPasswordForm {
  email: string;
  password: string;
  confirm_password: string;
}

export interface User {
  _id: string;
  name: string;
  role: string;
  email: string;
  password: string;
  isVerified: boolean;
  otp: number;
  balance: number;
  createdAt: string;
  updatedAt: string;
  isKYC: boolean;
  __v: number;
  transactionIds: UserTransaction[];
}

export interface UserTransaction {
  coin: any;
  amount: number;
  id: string;
  coinFrom: string;
  coinTo: string;
  time: string;
  status: string;
  transactionType: string;
}

export interface Transaction {
  id: string;
  amount: number;
  amountTo: number;
  coinFrom: Coin;
  coinTo: Coin;
  comment: null;
  createdAt: Date;
  depositAddress: string;
  depositExtraId: null;
  withdrawalAddress: string;
  withdrawalExtraId: null;
  refundAddress: null;
  refundExtraId: null;
  hashIn: Hash;
  hashOut: Hash;
  rate: number;
  rateType: string;
  affiliateToken: null;
  status: string;
  email: null;
}

export interface Coin {
  coinCode: string;
  coinName: string;
  network: string;
  networkName: string;
  networkShortName: string;
  icon: string;
  memoName: string;
}

export interface Hash {
  hash: null;
  link: null;
}

export interface ConvertedCoin {
  fromAmount: number;
  toAmount: number;
  rate: number;
  message: null;
  minAmount: number;
  withdrawMin: number;
}

export type Network = {
  network: string;
  name: string;
  shortName: string;
  notes: string;
  addressRegex: string;
  isDefault: boolean;
  blockExplorer: string;
  depositMinAmount: number | null;
  memoNeeded: boolean;
  memoName: string;
  memoRegex: string;
  precision: number;
};

export type Currency = {
  code: string;
  name: string;
  icon: string;
  notes: string;
  networks: Network[];
};

export type ApiResponse = {
  data: Currency[];
  count: number;
};
