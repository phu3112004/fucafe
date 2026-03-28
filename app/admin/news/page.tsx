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
    toast.success("Delete post successfully!");
  };
  const handleSave = async (title: string, thumbnail: string, content: any) => {
    if (!title || !content) {
      toast.error("Title and content cannot be empty!");
      return;
    }
    if (editingId) {
      const data = await updatePost(title, thumbnail, content, editingId);
      if (data) {
        setEditingId(null);
        fetchPosts();
        toast.success("Update post successfully!");
      }
    } else {
      const data = await createPost(title, thumbnail, content);
      if (data) {
        setIsDialogOpen(false);
        fetchPosts();
        toast.success("Create post successfully!");
      }
    }
  };
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Thumbnail",
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
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => new Date(text).toLocaleDateString("en-US"),
    },
    {
      title: "Actions",
      key: "action",
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
            <DialogContent className="max-w-6xl w-[95vw] max-h-[95vh]">
              <DialogHeader>
                <DialogTitle>Edit Post</DialogTitle>
                <DialogDescription>
                  Edit the post information. Note that changes will affect the
                  post and be displayed on the homepage. Make sure to fill in
                  all required fields.
                </DialogDescription>
              </DialogHeader>
              <BlogEditor post={record} onSave={handleSave} />
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
                  Are you sure you want to delete this post? This action cannot
                  be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(record._id)}>
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
    <div className="p-8">
      <h1 className="text-3xl font-bold text-primary mb-8">News Management</h1>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button className="px-4 py-2 mb-6 float-right bg-blue-500 text-white rounded hover:bg-blue-600">
            Create Post
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-5xl w-full">
          <DialogHeader>
            <h2 className="text-xl font-semibold">Create New Post</h2>
            <DialogTitle className="text-sm text-gray-500">
              Write content for your post
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
