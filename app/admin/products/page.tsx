"use client";
import { Button, Table } from "antd";
import { useProducts } from "@/hooks/useProducts";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import AdminProductModal from "@/components/product/admin/AdminProductModal";
import { useState } from "react";

const AdminProductsPage = () => {
  const { products, loading, fetchProducts, deleteProduct } = useProducts();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (id: string) => (
        <span className="font-mono text-gray-500">
          #{id.slice(-9).toUpperCase()}
        </span>
      ),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <img
          src={image}
          alt={`${image}`}
          className="w-16 h-16 object-cover rounded"
        />
      ),
    },
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
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Dialog
            open={editingId === record._id}
            onOpenChange={(open) => setEditingId(open ? record._id : null)}
          >
            <DialogTrigger asChild>
              <Button type="primary" className="mr-2">
                Sửa
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sửa sản phẩm</DialogTitle>
                <DialogDescription>
                  Chỉnh sửa thông tin sản phẩm. Lưu ý rằng thay đổi sẽ ảnh hưởng
                  đến sản phẩm, danh mục và trang chủ.
                </DialogDescription>
              </DialogHeader>
              <AdminProductModal
                product={record}
                onSuccess={() => {
                  fetchProducts();
                  setEditingId(null);
                }}
              />
            </DialogContent>
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button type="primary" danger>
                Xóa
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                <AlertDialogDescription>
                  Bạn có chắc chắn muốn xóa sản phẩm này? Hành động này không
                  thể hoàn tác và sẽ ảnh hưởng đến trang chủ, danh mục và đơn
                  hàng liên quan.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteProduct(record._id)}>
                  Xóa
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
  ];
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-8">Quản lý sản phẩm</h1>
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogTrigger asChild>
          <Button type="primary" className="mb-4 float-right">
            +Thêm Sản Phẩm Mới
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm sản phẩm</DialogTitle>
            <DialogDescription>
              Lưu ý: Thêm sản phẩm mới sẽ ảnh hưởng đến trang chủ và các danh
              mục.
            </DialogDescription>
          </DialogHeader>
          <AdminProductModal
            onSuccess={() => {
              fetchProducts();
              setIsAddOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
      <Table
        columns={columns}
        dataSource={products}
        loading={loading}
        rowKey={"_id"}
      />
    </div>
  );
};

export default AdminProductsPage;
