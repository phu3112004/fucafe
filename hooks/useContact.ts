import { useState, useEffect } from "react";
import { Contact, ContactFormData } from "@/types/contact-types";

const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  // 1. Hàm lấy danh sách
  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  // Tự động tải khi Hook được gọi
  useEffect(() => {
    fetchContacts();
  }, []);

  // 2. Hàm thêm mới
  const addContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.message ||
      !formData.phone
    )
      return alert("Please fill in all required fields!");

    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      // Reset form & Load lại
      setFormData({ name: "", phone: "", email: "", message: "" });
      fetchContacts();
    } catch (error) {
      console.error("Error submitting contact form:", error);
    } finally {
      setLoading(false);
    }
  };

  const setFormValue = (field: keyof ContactFormData, value: string) => {
    setFormData((prev: ContactFormData) => ({ ...prev, [field]: value }));
  };

  return {
    contacts,
    formData,
    loading,
    setFormValue,
    addContact,
  };
};

export { useContacts };
