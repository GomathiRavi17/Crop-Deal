import { CropDetails } from "../cropdetails/cropdetails";
import { Address } from "./address";

export interface farmer{
    fid:number,
    name:string,
    image: string,
    email: string,
    address: Address,
    contact: string,
    about: string,
    cropDetails?: CropDetails[]
}