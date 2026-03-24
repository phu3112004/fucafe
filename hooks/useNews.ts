"use client";

import { useEffect, useState } from "react";

export const useNews = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/news");
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Có lỗi xảy ra khi tải bài viết");
      }
      setPosts(result.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async (title: string, content: any) => {
    if (!title.trim()) {
      setError("Tiêu đề không được để trống");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Có lỗi xảy ra khi đăng bài");
      }

      setSuccess(true);
      return result.data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { posts, setPosts, createPost, fetchPosts, loading, error, success };
};
