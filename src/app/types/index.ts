export type TRequestStatus = 
  | "ON_APPROVAL" 
  | "APPROVED" 
  | "ORDERED" 
  | "ARRIVED" 
  | "ISSUED";

export const STATUS_LABELS: Record<TRequestStatus, string> = {
  ON_APPROVAL: "На согласовании",
  APPROVED: "Согласовано",
  ORDERED: "Заказано",
  ARRIVED: "Приехало",
  ISSUED: "Выдано",
};

export const STATUS_FLOW: TRequestStatus[] = [
  "ON_APPROVAL",
  "APPROVED",
  "ORDERED",
  "ARRIVED",
  "ISSUED",
];

export type TDepartment = { 
  id: string; 
  name: string; 
};

export type TOrderItem = { 
  id: string; 
  name: string; 
  link?: string; 
  unit: string; 
  quantity: number; 
  price: number; 
  totalPrice: number; 
};

export type TRequest = { 
  id: string; 
  number: number; 
  creatorName: string; 
  department: TDepartment; 
  isApproved: boolean; 
  status: TRequestStatus; 
  items: TOrderItem[]; 
  totalPrice: number; 
  createdAt: string; 
  updatedAt: string; 
};