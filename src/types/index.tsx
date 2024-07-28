import { IconType } from "@react-icons/all-files";


export type MoreItem = {
  description: string[];
  workingHours: string[];
  extraCharges: string[];
  terms: string[];
};



export interface ServiceType {
  id?: string;
  name: string;
  categoryId: string; 
  duration: string;
  price: number;
  description: string[];
  workingHours: string[];
  extraCharges: string[];
  terms: string[];
}

export interface UserType {
  id?: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  password?: string;
  state: string;
  city: string;
  address: string;
  zipCode: string;
  createdAt?:  string | number | Date;
  bookings?: BookingType[]
}

export interface BookingType {
  id?: string;
  userId: string | null;
  time?: string;
  date?: string;
  bookingId?: string;
  serviceId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  state: string;
  city: string;
  address: string;
  zipCode: string;
  user?: UserType;
  service?: ServiceType;
  createdAt?: string | number | Date;
}


export interface CategoryType {
  id: string;
  title: string;
  services?: ServiceType[];
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

export interface FormState {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  state: string;
  city: string;
  address: string;
  zipCode: string;
  agreeTerms: boolean;
}

 export interface GalleryItem {
  id: string;
  url: string;
  category: string;
}