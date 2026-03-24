"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useState, useEffect } from "react";
import { useCloudinary } from "@/hooks/useCloudinary";

export default function BlogEditor({
  onSave,
  post,
}: {
  post?: { id: string; title: string; thumbnail: string; content: any };
  onSave: (title: string, thumbnail: string, data: any) => void;
}) {
  const [title, setTitle] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string>("");
  const { uploadImage, isUploading } = useCloudinary(); // Sử dụng hook

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: "<p>Viết nội dung...</p>",
    immediatelyRender: false,
    editorProps: {
      attributes: { class: "prose focus:outline-none min-h-[400px] p-4" },
    },
  });

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setThumbnail(post.thumbnail);
      editor?.commands.setContent(post.content);
    }
  }, [post, editor]);

  // Xử lý chèn ảnh VÀO NỘI DUNG (Tiptap)
  const handleEditorImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editor) {
      const url = await uploadImage(file);
      if (url) editor.chain().focus().setImage({ src: url }).run();
    }
  };

  // Xử lý THUMBNAIL RIÊNG
  const handleThumbnailUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await uploadImage(file);
      if (url) setThumbnail(url);
    }
  };

  return (
    <div className="rounded-lg bg-white shadow-inner max-h-[50vh] overflow-y-auto p-4">
      <div className="mb-6 flex flex-col gap-2">
        <p className="font-medium text-gray-700">Ảnh đại diện bài viết</p>
        <div className="flex items-center gap-4">
          {thumbnail && (
            <img
              src={thumbnail}
              className="w-32 h-20 object-cover rounded border"
              alt="Thumb"
            />
          )}
          <label className="cursor-pointer bg-gray-100 px-4 py-2 rounded border hover:bg-gray-200 text-sm">
            {isUploading ? "Đang tải..." : "Chọn ảnh Thumbnail"}
            <input
              type="file"
              className="hidden"
              onChange={handleThumbnailUpload}
            />
          </label>
        </div>
      </div>

      {/* TIÊU ĐỀ */}
      <input
        type="text"
        placeholder="Tiêu đề bài viết..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full py-2 border-b text-2xl font-bold mb-4 focus:outline-none focus:border-blue-500"
      />

      {/* TOOLBAR */}
      <div className="flex gap-2 border bg-gray-50 sticky top-0 z-10 rounded-t-md">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className="p-1 px-3 border rounded bg-white font-bold"
        >
          B
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className="p-1 px-3 border rounded bg-white font-bold italic font-serif"
        >
          I
        </button>

        <label className="p-1 px-3 border rounded bg-blue-50 cursor-pointer text-sm flex items-center gap-1">
          📷 Chèn ảnh vào bài
          <input type="file" className="hidden" onChange={handleEditorImage} />
        </label>
      </div>

      <div className="border border-t-0 rounded-b-md">
        <EditorContent editor={editor} />
      </div>
      <button
        onClick={() => onSave(title, thumbnail, editor?.getJSON())}
        disabled={isUploading}
        className="float-right mt-4 ml-auto bg-green-600 text-white px-6 py-1 rounded hover:opacity-90 disabled:bg-gray-400"
      >
        {isUploading ? "Đang xử lý..." : "Lưu bài"}
      </button>
    </div>
  );
}
