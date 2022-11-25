import { Profession } from "../models/profession/profession";
import { Role } from "../models/user/role";


export interface UserI {
  id: number ;
  name: string;
  email: string;
  password: string;
  firstName: string;
  additionalName: string;
  lastName: string;
  secondName: string;
  isActive: boolean;
  search :string;
  roles:Role[];
  profession:Profession;
  isResponsible: boolean;
  username:string;
  isUser: boolean;
}
