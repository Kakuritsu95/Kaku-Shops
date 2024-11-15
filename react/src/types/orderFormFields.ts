export type OrderFormFields = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
  proofType: "RECEIPT" | "INVOICE";
  vatNumber?: "string";
};
