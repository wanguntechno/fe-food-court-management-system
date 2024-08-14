interface TenantType {
  uuid: string;
  name: string;
  email: string;
  phone_number: string;
  bank_account_name: string;
  bank_account_number: string;
  created_at: number;
  area: AreaType;
  photo: string | null;
}
export default TenantType;

export interface AreaType {
  uuid: string;
  name: string;
  code: string;
  description: string;
  created_at: number;
}
