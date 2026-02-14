const status = [
  { value: "PENDING", label: "Chờ xác nhận", color: "orange" },
  { value: "PREPARING", label: "Đang chuẩn bị", color: "blue" },
  { value: "READY_FOR_PICKUP", label: "Chờ đến lấy hàng", color: "cyan" },
  { value: "SHIPPED", label: "Đang giao hàng", color: "geekblue" },
  { value: "DELIVERED", label: "Đã giao hàng", color: "green" },
  { value: "ENDED", label: "Đã hoàn thành", color: "default" },
  { value: "CANCELLED", label: "Đã hủy", color: "red" },
];

export { status };
