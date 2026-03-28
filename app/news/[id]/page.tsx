"use client";
import { useNews } from "@/hooks/useNews";
import { use } from "react";
import { Typography, Image, Divider, Tag, Breadcrumb } from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const { Title, Paragraph, Text } = Typography;

const NewsDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { getPostById } = useNews();
  const post = getPostById(id);

  if (!post) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <Title level={3}>Post not found</Title>
        <Link href="/news">Back to News Page</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px" }}>
      <Breadcrumb
        style={{ marginBottom: "20px" }}
        items={[
          { title: <Link href="/">Home</Link> },
          { title: <Link href="/news">News</Link> },
          { title: "Post Details" },
        ]}
      />

      <article>
        <Title level={1} style={{ marginBottom: "16px", fontSize: "32px" }}>
          {post.title}
        </Title>

        <div
          style={{
            marginBottom: "24px",
            color: "#8c8c8c",
            display: "flex",
            gap: "20px",
          }}
        >
          <span>
            <CalendarOutlined /> 25/03/2026
          </span>
          <span>
            <UserOutlined /> Admin
          </span>
          <Tag color="blue">Latest News</Tag>
        </div>

        <Divider />

        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <Image
            src={post.thumbnail || "/news_default.jpg"}
            alt={post.title}
            style={{
              borderRadius: "12px",
              width: "100%",
              maxHeight: "500px",
              objectFit: "cover",
            }}
            placeholder={true}
          />
        </div>

        <Typography
          style={{ fontSize: "18px", lineHeight: "1.8", color: "#333" }}
        >
          {post.content?.content?.map((paragraph: any, pIndex: number) => (
            <Paragraph key={pIndex} style={{ marginBottom: "20px" }}>
              {paragraph.content?.map((item: any, iIndex: number) => (
                <span
                  key={iIndex}
                  style={{
                    fontWeight: item.marks?.some((m: any) => m.type === "bold")
                      ? "bold"
                      : "normal",
                    fontStyle: item.marks?.some((m: any) => m.type === "italic")
                      ? "italic"
                      : "normal",
                  }}
                >
                  {item.type === "text" ? item.text : ""}
                </span>
              ))}
            </Paragraph>
          ))}
        </Typography>

        <Divider style={{ marginTop: "50px" }} />

        <div style={{ textAlign: "center", paddingBottom: "40px" }}>
          <Link href="/news">
            <Text type="secondary" style={{ cursor: "pointer" }}>
              <ArrowLeftOutlined /> Back to News List
            </Text>
          </Link>
        </div>
      </article>
    </div>
  );
};

export default NewsDetailPage;
