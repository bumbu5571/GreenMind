export type User = {
  id: number;
  username: string;
  email: string;
  isCompany: boolean;
  name?: string;
  score?: number;
};

export type Inputs = {
  username?: string;
  email: string;
  password: string;
  isCompany: boolean;
};

export type NavItem = {
  label: string;
  href?: string;
};

export type AuthFormProps = {
  title: string;
  type: 'signin' | 'signup';
};

export type Company = {
  id: number;
  name: string;
  Promotions: Promotion[];
};

export type Promotion = {
  id: number;
  name: string;
  description: string;
  category: string;
  img: string;
  score: number;
  date: string;
  dateEnd: string;
  Company?: Company;
  Users: string[];
  companyId?: number;
}

export type DashboardProps = {
  target: 'company' | 'user';
};

export type PromotionInputs = {
  name: string;
  date: string; // ?
  dateEnd: string;
  score: number;
  descrip: boolean;
  companyId: number;
  category: string;
  img: string;
  description: string;
};
