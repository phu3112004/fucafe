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
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogDescription>
                  Edit product information. Note that changes will affect the
                  product, category, and homepage.
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
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this product? This action
                  cannot be undone and will affect the homepage, category, and
                  related orders.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteProduct(record._id)}>
                  Delete
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
      <h1 className="text-3xl font-bold text-primary mb-8">
        Product Management
      </h1>
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogTrigger asChild>
          <Button type="primary" className="mb-4 float-right">
            +Add New Product
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
            <DialogDescription>
              Note: Adding a new product will affect the homepage and
              categories.
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
