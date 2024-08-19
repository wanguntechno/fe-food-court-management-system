interface AuthType {
  uuid: string;
  username: string;
  name: string;
  email: string | null;
  phone_number: string | null;
  photo_url: string | null;
  role: RoleType;
}
export default AuthType;

export interface RoleType {
  uuid: string;
  name: string;
  code: string;
  description: string;
  created_at: string | null;
}
