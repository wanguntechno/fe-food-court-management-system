export interface UserType {
  uuid: string;
  name: string;
  employee_number: string;
  phone_number: string;
  address: any;
  is_master: number;
  created_at: number;
  tenant: TenantType;
  user: {
    uuid: string;
    username: string;
    created_at: number;
  };
}

export interface TenantType {
  uuid: string;
  name: string;
  email: string;
  balance: string;
  phone_number: string;
  bank_account_name: string;
  bank_account_number: string;
  is_open: string;
  created_at: number;
}
