"use client";
import { Table } from "antd";
import { useProducts } from "@/hooks/useProducts";
import Link from "next/link";

const Products = () => {
  const { products, loading } = useProducts();
  const columns = [
    { title: "ID", dataIndex: "_id", key: "_id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Best Seller",
      dataIndex: "isBestSeller",
      key: "isBestSeller",
      render: (isBestSeller: boolean) => (isBestSeller ? "Yes" : "No"),
    },
  ];
  return (
    <>
      <Link
        href="/admin/products/new"
        className="bg-[#6F4E37] text-white font-bold py-2 rounded-[20px] hover:bg-[#5a3e2b] mb-4 inline-block px-4 float-right"
      >
        +Thêm Sản Phẩm Mới
      </Link>
      <Table
        columns={columns}
        dataSource={products}
        loading={loading}
        rowKey={(record) => record._id}
      />
    </>
  );
};

export default Products;
