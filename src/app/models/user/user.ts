import { Profession } from "../profession/profession";
import { Generic } from "../generic/generic";
import { Role } from "./role";



export class User implements Generic  {
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




}
