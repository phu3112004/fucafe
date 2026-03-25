"use client";
import { Masonry } from "antd";
import { useNews } from "@/hooks/useNews";
import NewsCard from "@/components/news/NewsCard";

const NewsPage = () => {
  const { posts } = useNews();
  return (
    <div className="py-8 px-16 max-w-7xl mx-auto min-h-screen bg-gray-50 rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Tin tức mới nhất</h1>
      <Masonry
        columns={4}
        gutter={16}
        items={posts.map((post, index) => ({
          key: `item-${index}`,
          data: post,
        }))}
        itemRender={({ data }) => <NewsCard item={data} />}
      />
    </div>
  );
};

export default NewsPage;
