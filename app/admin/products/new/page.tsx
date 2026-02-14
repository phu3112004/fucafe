// components/NewProduct.tsx
"use client";
import { useProducts } from "@/hooks/useProducts";
import { categories } from "@/const/product-const";
import ImageUpload from "@/components/ImageUpload";

const NewProduct = () => {
  // Lấy productForm và error ra để hiển thị
  const { addProduct, setProductForm, productForm, error, loading } =
    useProducts();

  // Hàm xử lý chung khi người dùng nhập liệu
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setProductForm(name as any, checked);
    } else if (type === "number") {
      setProductForm(name as any, Number(value));
    } else {
      setProductForm(name as any, value);
    }
  };

  const addTextOrNumberItem = [
    {
      label: "Tên sản phẩm",
      type: "text",
      name: "name",
      placeholder: "Vd: Coffee",
    },
    { label: "Giá", type: "number", name: "price", placeholder: "Vd: 10000" },
  ];

  const addTextareaItem = [
    {
      label: "Mô tả",
      type: "textarea",
      name: "description",
      placeholder: "Vd: Mô tả sản phẩm",
    },
  ];

  const addCheckboxItem = [
    { label: "Best Seller", type: "checkbox", name: "isBestSeller" },
  ];

  const addSelectItem = categories.map((category) => ({
    label: category,
    value: category,
  }));

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-8">
        Thêm sản phẩm mới
      </h1>

      {/* Hiển thị lỗi nếu có */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      <form onSubmit={addProduct} className="grid grid-cols-1 gap-4">
        {/* Input Text & Number */}
        {addTextOrNumberItem.map((item) => (
          <div key={item.name} className="flex flex-col">
            <label htmlFor={item.name} className="mb-1 font-medium">
              {item.label}
            </label>
            <input
              type={item.type}
              name={item.name}
              placeholder={item.placeholder}
              className="border p-2 rounded"
              value={(productForm as any)[item.name]}
              onChange={handleInputChange}
            />
          </div>
        ))}

        {/* Textarea */}
        {addTextareaItem.map((item) => (
          <div key={item.name} className="flex flex-col">
            <label htmlFor={item.name} className="mb-1 font-medium">
              {item.label}
            </label>
            <textarea
              name={item.name}
              placeholder={item.placeholder}
              className="border p-2 rounded"
              value={productForm.description}
              onChange={handleInputChange}
            />
          </div>
        ))}

        {/* Select Box */}
        <div className="flex flex-col">
          <label htmlFor="category" className="mb-1 font-medium">
            Danh mục
          </label>
          <select
            name="category"
            className="border p-2 rounded"
            value={productForm.category}
            onChange={handleInputChange}
          >
            <option value="">-- Chọn danh mục --</option>
            {addSelectItem.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        {/* Checkbox */}
        {addCheckboxItem.map((item) => (
          <label
            key={item.name}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type={item.type}
              name={item.name}
              className="h-4 w-4"
              checked={productForm.isBestSeller}
              onChange={handleInputChange}
            />
            <span>{item.label}</span>
          </label>
        ))}

        {/* Image Upload */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Hình ảnh</label>
          <ImageUpload
            onUpload={(url) => {
              setProductForm("image", url);
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`py-2 px-4 rounded text-white ${loading ? "bg-gray-400" : "bg-[#6F4E37] hover:bg-[#5a3e2b]"}`}
        >
          {loading ? "Đang xử lý..." : "Thêm sản phẩm"}
        </button>
      </form>
    </div>
  );
};
export default NewProduct;
