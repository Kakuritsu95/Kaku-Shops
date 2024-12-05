export enum Subject {
  OrderProgress = "Order progress",
  TechnicalSupport = "Technical support",
  ProductRefund = "Product refund",
  Other = "Other",
}

export interface ContactFormFields {
  firstName: string;
  lastName: string;
  email: string;
  subject: Subject;
  orderRefCode?: string;
  message: string;
  recaptchaToken: string;
}
