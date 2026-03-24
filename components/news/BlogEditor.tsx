"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useState } from "react";

export default function BlogEditor({
  onSave,
}: {
  onSave: (title: string, data: any) => void;
}) {
  const [title, setTitle] = useState<string>("");

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: "<p>Viết nội dung bài viết tại đây...</p>",
    immediatelyRender: false, // Fix lỗi SSR bạn vừa gặp
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[400px] p-4",
      },
    },
  });

  const uploadAndInsertImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      `${process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}`,
    );

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );
    const data = await res.json();

    // Chèn ảnh vào đúng vị trí con trỏ
    editor.chain().focus().setImage({ src: data.secure_url }).run();
  };

  return (
    <div className="-border rounded-lg bg-white shadow-inner no-scrollbar max-h-[75vh] overflow-y-auto">
      <input
        type="text"
        placeholder="Tiêu đề bài viết..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2 border-b text-xl font-semibold focus:outline-none"
        required
      />
      <div className="flex gap-2 p-2 border-b bg-gray-50 sticky top-0 z-10">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className="px-2 py-1 border rounded"
        >
          <b>B</b>
        </button>
        <button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className="px-2 py-1 border rounded"
        >
          H2
        </button>
        <label className="px-2 py-1 border rounded bg-blue-50 cursor-pointer">
          📷 Thêm ảnh
          <input
            type="file"
            className="hidden"
            onChange={uploadAndInsertImage}
          />
        </label>
        <button
          onClick={() => onSave(title, editor?.getJSON())}
          className="ml-auto bg-green-600 text-white px-4 py-1 rounded hover:opacity-90 cursor-pointer"
        >
          Lưu bài
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
