import { Card } from "antd";
import { News } from "@/types/news-types";
import Link from "next/link";

const NewsCard = ({ item }: { item: News }) => {
  return (
    <Link href={`/news/${item._id}`} style={{ textDecoration: "none" }}>
      <Card
        hoverable
        style={{
          marginBottom: "16px",
          borderRadius: "8px",
          overflow: "hidden",
        }}
        cover={
          <img
            alt={item.title}
            src={item.thumbnail || "/news_default.jpg"}
            style={{ display: "block" }}
          />
        }
      >
        <Card.Meta title={item.title} />
        <div style={{ marginTop: "10px", fontSize: "12px", color: "#8c8c8c" }}>
          {new Date(item.createdAt).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </Card>
    </Link>
  );
};

export default NewsCard;
