export type RequestStatus = 
  | "ON_APPROVAL" 
  | "APPROVED" 
  | "ORDERED" 
  | "ARRIVED" 
  | "ISSUED";

export const STATUS_LABELS: Record<RequestStatus, string> = {
  ON_APPROVAL: "На согласовании",
  APPROVED: "Согласовано",
  ORDERED: "Заказано",
  ARRIVED: "Приехало",
  ISSUED: "Выдано",
};

export type Department = { 
  id: string; 
  name: string; 
};

export type OrderItem = { 
  id: string; 
  name: string; 
  link?: string; 
  unit: string; 
  quantity: number; 
  price: number; 
  totalPrice: number; 
};

export type Request = { 
  id: string; 
  number: number; 
  creatorName: string; 
  department: Department; 
  isApproved: boolean; 
  status: RequestStatus; 
  items: OrderItem[]; 
  totalPrice: number; 
  createdAt: string; 
  updatedAt: string; 
};