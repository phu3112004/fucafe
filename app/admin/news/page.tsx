"use client";
import BlogEditor from "@/components/news/BlogEditor"; // Đường dẫn đến file editor của bạn
import { useNews } from "@/hooks/useNews";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Table } from "antd";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "antd";

export default function AdminNewsPage() {
  const { posts, createPost, loading, fetchPosts, deletePost, updatePost } =
    useNews();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    deletePost(id);
    toast.success("Xóa bài viết thành công!");
  };
  const handleSave = async (title: string, thumbnail: string, content: any) => {
    if (editingId) {
      const data = await updatePost(title, thumbnail, content, editingId);
      if (data) {
        setEditingId(null);
        fetchPosts();
        toast.success("Cập nhật thành công!");
      }
    } else {
      const data = await createPost(title, thumbnail, content);
      if (data) {
        setIsDialogOpen(false);
        fetchPosts();
        toast.success("Đăng bài thành công cho Fucafe!");
      }
    }
  };
  const columns = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (url?: string) =>
        url ? (
          <img
            src={url}
            alt="Thumbnail"
            className="w-20 h-20 object-cover rounded"
          />
        ) : (
          <img
            src="/news_default.jpg"
            alt="No Thumbnail"
            className="w-20 h-20 object-cover rounded"
          />
        ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Hành động",
      key: "action",
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
            <DialogContent className="max-w-6xl w-[95vw] max-h-[95vh]">
              <DialogHeader>
                <DialogTitle>Sửa bài viết</DialogTitle>
                <DialogDescription>
                  Chỉnh sửa thông tin bài viết. Lưu ý rằng thay đổi sẽ ảnh hưởng
                  đến bài viết, hiển thị lên trang chủ.
                </DialogDescription>
              </DialogHeader>
              <BlogEditor post={record} onSave={handleSave} />
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
                  Bạn có chắc chắn muốn xóa bài viết này? Hành động này không
                  thể hoàn tác.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(record._id)}>
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
    <div className="p-8">
      <h1 className="text-3xl font-bold text-primary mb-8">Quản lý tin tức</h1>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button className="px-4 py-2 mb-6 float-right bg-blue-500 text-white rounded hover:bg-blue-600">
            Đăng bài
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-5xl w-full">
          <DialogHeader>
            <h2 className="text-xl font-semibold">Tạo bài viết mới</h2>
            <DialogTitle className="text-sm text-gray-500">
              Viết nội dung cho bài viết của bạn
            </DialogTitle>
          </DialogHeader>
          <BlogEditor onSave={handleSave} />
        </DialogContent>
      </Dialog>

      <Table
        rowKey={"_id"}
        columns={columns}
        dataSource={posts}
        loading={loading}
        pagination={{ pageSize: 8 }}
      />
    </div>
  );
}
