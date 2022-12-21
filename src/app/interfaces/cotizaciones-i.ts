import { Profession } from "../models/profession/profession";
import { Role } from "../models/user/role";


export interface CotizacionesI {
  id: number,
  email: string,
  name: string,
  phone: string,
  message: string,
  created_at: string
}
