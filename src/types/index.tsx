import { IconType } from "@react-icons/all-files";


export type MoreItem = {
  description: string[];
  workingHours: string[];
  extraCharges: string[];
  terms: string[];
};
export interface More {
  description: string[];
  workingHours: string[];
  extraCharges: string[];
  terms: string[];
}

export interface Service {
  id: number;
  name: string;
  duration: string;
  price: number;
  more: More;
}

export interface Booking {
  title: string;
  services: Service[];
}

export interface AddressItem {
  title: string;
  icon: IconType;
  link: string;
}

export interface SidebarItem {
  title: string;
  icon: IconType;
  link: string;
}



export interface Category {
  id: number;
  name: string;
}

