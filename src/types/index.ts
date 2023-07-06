export interface Coinslist {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: String;
  atl: number;
  atl_change_percentage: number;
  atl_date: String;
  roi: Roi | null;
  last_updated: String;
  sparkline_in_7d: SparklineIn7D;
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
  __v: number;
  transactionIds: UserTransaction[];
}

export interface UserTransaction {
  amount: number;
  id: string;
  coin: string;
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
