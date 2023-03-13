import { Address } from "./address";

export interface dealer {
    did: number,
    name: string,
    image: string,
    email: string,
    address: Address,
    contact: string,
    about: string
}