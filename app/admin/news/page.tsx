// app/admin/news/page.tsx
"use client";
import BlogEditor from "@/components/news/BlogEditor"; // Đường dẫn đến file editor của bạn
import { useNews } from "@/hooks/useNews";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Table } from "antd";
import { toast } from "sonner";
import { useState } from "react";

export default function AdminNewsPage() {
  const { posts, createPost, loading, fetchPosts } = useNews();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const columns = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
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
      render: () => <span>Chỉnh sửa | Xóa</span>,
    },
  ];

  const handleSavePost = async (title: string, content: any) => {
    const data = await createPost(title, content);
    if (data) {
      setIsDialogOpen(false);
      fetchPosts();
      toast.success("Đăng bài thành công cho Fucafe!");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Đăng tin tức Fucafe</h1>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
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
          <BlogEditor onSave={handleSavePost} />
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
