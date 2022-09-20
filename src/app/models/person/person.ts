import { Profession } from "../profession/profession";
import { Generic } from "../generic/generic";



export class Person implements Generic  {
  id: number ;
  name: string;
  firstName: string;
  additionalName: string;
  lastName: string;
  secondName: string;
  isActive: boolean;
  search :string;
  profession: Profession;
}
