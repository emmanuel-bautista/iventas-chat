export type Auth = {
  email: string;
  password: string;
};

export type User = {
  _id: string;
  name: string;
  phone: string;
  avatar: string;
  age: number;
  email: string;
  priority: string;
  problem: string;
  promotion: string;
  curp: string;
};

export type Message = {
  _id?: string;
  content: string;
  from: string;
  to: string;
  createdAt?: Date;
};
