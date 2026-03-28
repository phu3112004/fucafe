"use client";

import { useCartStore } from "@/store/useCartStore";
import { Table, InputNumber, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

const CartPage = () => {
  const { items, updateQuantity, removeItem } = useCartStore();
  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <img
          src={image}
          alt="Product Image"
          className="w-16 h-16 object-cover rounded"
        />
      ),
    },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Price", dataIndex: "price", key: "price" },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity: number, record: any) => (
        <InputNumber
          min={1}
          max={99}
          defaultValue={quantity}
          value={quantity} // Quan trọng: Binding giá trị thực tế
          onChange={(value) => {
            if (value) {
              // Gọi hàm update trên store
              updateQuantity(record._id, value);
            }
          }}
        />
      ),
    },
    {
      title: "Total Price",
      key: "total",
      render: (_: any, record: any) => (
        <span className="font-bold text-primary">
          {(record.price * record.quantity).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      ),
    },
    {
      title: "Delete",
      key: "action",
      render: (_: any, record: any) => (
        <Dialog>
          <DialogTrigger>
            <div className="cursor-pointer text-red-500 hover:text-red-700">
              <DeleteOutlined />
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Are you sure you want to delete this product?
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button color="primary" variant="solid">
                  Cancel
                </Button>
              </DialogClose>
              <Button onClick={() => removeItem(record._id)}>Yes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ),
    },
  ];
  return (
    <div className="mb-4 py-4 px-16">
      <Table
        columns={columns}
        dataSource={items}
        rowKey={(record) => record._id}
      />
      {/* Phần tổng tiền tạm tính */}
      {items.length > 0 && (
        <div className="mt-8 flex justify-end">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm min-w-[300px]">
            <div className="flex justify-between mb-4 text-xl font-bold">
              <span>Total:</span>
              <span className="text-primary">
                {useCartStore.getState().totalPrice.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
            <button className="w-full bg-[#6F4E37] text-white py-3 rounded hover:bg-[#5a3e2b] transition">
              <Link href="/cart/checkout">Checkout Now</Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
