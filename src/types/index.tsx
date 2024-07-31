import { IconType } from "@react-icons/all-files";


export type MoreItem = {
  description: string[];
  workingHours: string[];
  extraCharges: string[];
  terms: string[];
};



export interface ServiceType {
  _id?: string;
  name: string;
  categoryId: string; 
  duration: string;
  price: number ;
  description: string[];
  workingHours: string[];
  extraCharges: string[];
  terms: string[];
}

export interface UserType {
  _id?: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  password?: string;
  state: string;
  city: string;
  address: string;
  zipCode: string;
  createdAt?:  string | number | Date;
  bookings?: IBooking[]
}

export interface BookingType {
  _id?: string;
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
  comment?: string;
  service?: ServiceType;
  createdAt?: string | number | Date;
}


export interface CategoryType {
  _id: string;
  title: string;
  services?: ServiceType[];
}


export interface AddressItem {
  title: string;
  icon: IconType;
  link: string ;
}


export interface IAddess  {
  _id: string;
  phoneNumber: string;
  email: string;
  instagram?: string;
  address: string;
  twitter?: string;
  whatsapp?: string;
  facebook?: string;
  bank: Bank;
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
  _id: string;
  url: string;
  category: string;
}

export interface IAdmin  {
  _id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  instagram?: string;
  twitter?: string;
  whatsapp?: string;
  facebook?: string;
  address: string;
  password: string;
  admin: boolean;
  bank: Bank;
}

interface Bank {
  name: string;
  account: number;
  bankName: string;
}




 export interface IBooking {
  _id?: string;
  userId: string | null;
  time?: string;
  date?: string;
  bookingId?: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  state: string;
  city: string;
  address: string;
  zipCode: string;
  comment?: string;
  serviceId?: ServiceType;
  createdAt?: string | number | Date;
}