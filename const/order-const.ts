const status = [
  { value: "PENDING", label: "Chờ xác nhận", color: "orange" },
  { value: "PREPARING", label: "Đang chuẩn bị", color: "blue" },
  { value: "READY_FOR_PICKUP", label: "Chờ đến lấy hàng", color: "cyan" },
  { value: "SHIPPED", label: "Đang giao hàng", color: "geekblue" },
  { value: "DELIVERED", label: "Đã giao hàng", color: "green" },
  { value: "ENDED", label: "Đã hoàn thành", color: "default" },
  { value: "CANCELLED", label: "Đã hủy", color: "red" },
];
const PICKUP_FLOW = [
  "PENDING",
  "CONFIRMED",
  "PREPARING",
  "READY_FOR_PICKUP",
  "COMPLETED",
  "CANCELLED",
];
const DELIVERY_FLOW = [
  "PENDING",
  "CONFIRMED",
  "PREPARING",
  "SHIPPING",
  "DELIVERED",
  "COMPLETED",
  "CANCELLED",
];
export { status, PICKUP_FLOW, DELIVERY_FLOW };
