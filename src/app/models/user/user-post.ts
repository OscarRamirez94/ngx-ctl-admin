import { Profession } from "../profession/profession";
import { Generic } from "../generic/generic";
import { Role } from "./role";



export class UserPost implements Generic  {
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
  roles:string[];
  isResponsible: boolean;
  profession:Profession;
}
