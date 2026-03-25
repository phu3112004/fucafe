"use client";
import { Masonry, Pagination, Flex, Divider } from "antd";
import { useNews } from "@/hooks/useNews";
import NewsCard from "@/components/news/NewsCard";
import { useState, useMemo } from "react";

const NewsPage = () => {
  const { posts } = useNews();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const startIndex = useMemo(
    () => (currentPage - 1) * pageSize,
    [currentPage, pageSize],
  );
  const currentPosts = useMemo(
    () => posts.slice(startIndex, startIndex + pageSize),
    [posts, startIndex],
  );

  return (
    <div className="py-8 px-16 max-w-7xl mx-auto min-h-screen bg-gray-50 rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Tin tức mới nhất</h1>

      <Masonry
        columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        gutter={16}
        items={currentPosts.map((post, index) => ({
          key: post._id || `item-${index}`,
          data: post,
        }))}
        itemRender={({ data }) => <NewsCard item={data} />}
      />

      {/* 3. Thêm Pagination */}
      {posts.length > pageSize && (
        <>
          <Divider />
          <Flex justify="center" className="pb-8">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={posts.length}
              onChange={(page) => {
                setCurrentPage(page);
                // Cuộn lên đầu trang khi chuyển trang cho mượt
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              showSizeChanger={false}
            />
          </Flex>
        </>
      )}
    </div>
  );
};

export default NewsPage;
