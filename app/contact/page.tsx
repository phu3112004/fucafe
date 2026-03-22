"use client";
import { MapPinned, Phone, Mail } from "lucide-react";
import { useContacts } from "@/hooks/useContact";
import { toast } from "sonner";

const ContactPage = () => {
  const { formData, setFormValue, addContact, loading } = useContacts();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addContact(e);
      toast.success("Gửi liên hệ thành công!");
    } catch (error) {
      toast.error("Gửi liên hệ thất bại. Vui lòng thử lại.");
      console.error("Lỗi gửi liên hệ", error);
    }
  };
  const contactInfo = [
    {
      icon: <MapPinned />,
      text: "Số 123, Đường ABC, Quận 1, TP. Hồ Chí Minh",
    },
    {
      icon: <Phone />,
      text: "+84 123 456 789",
    },
    {
      icon: <Mail />,
      text: "support@fucafe.com",
    },
  ];
  const fields = [
    {
      label: "Họ và tên",
      name: "name",
      type: "text",
      placeholder: "Nguyễn Văn A",
      fullWidth: true,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "example@gmail.com",
      fullWidth: false,
    },
    {
      label: "Số điện thoại",
      name: "phone",
      type: "tel",
      placeholder: "0901234567",
      fullWidth: false,
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Liên hệ với chúng tôi
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-[url(/coffee.gif)] bg-cover bg-center bg-no-repeat p-8 text-white">
            <h2 className="text-2xl font-semibold mb-6">Thông tin liên lạc</h2>

            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="text-primary-500">{info.icon}</div>
                  <p className="text-lg">{info.text}</p>
                </div>
              ))}
            </div>

            <div className="w-full h-64 bg-primary-600 rounded-lg overflow-hidden border-2 border-primary-400">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1863.0492723599432!2d105.93687698577617!3d20.948557365873885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135af000afa8579%3A0x4abe0a6fffdc5c85!2zRnUgQ2Fmw6k!5e0!3m2!1svi!2s!4v1774158487434!5m2!1svi!2s"
                width="600"
                height="450"
                loading="lazy"
                title="bản đồ"
              ></iframe>
            </div>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.map((field) => (
                  <div
                    key={field.name}
                    className={field.fullWidth ? "md:col-span-2" : ""}
                  >
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.name}
                      type={field.type}
                      required
                      value={formData[field.name as keyof typeof formData]}
                      onChange={(e) =>
                        setFormValue(field.name as any, e.target.value)
                      }
                      placeholder={field.placeholder}
                      className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 border transition-all"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nội dung liên hệ
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormValue("message", e.target.value)}
                  placeholder="Bạn cần chúng tôi giúp gì?"
                  className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 border transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 rounded-md text-white bg-primary hover:bg-primary-700 disabled:bg-gray-400 transition-all font-medium"
              >
                {loading ? "Đang gửi..." : "Gửi lời nhắn"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
