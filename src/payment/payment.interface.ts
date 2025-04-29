export interface IPayment {
  id?: string;
  fromUserId?: string;
  toUserId?: string;
  amount?: string;
  reference?: string;
  status?: boolean;
}
