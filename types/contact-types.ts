interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}
interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}
export type { Contact, ContactFormData };
