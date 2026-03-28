const status = [
  { value: "PENDING", label: "Pending", color: "orange" },
  { value: "PREPARING", label: "Preparing", color: "blue" },
  { value: "READY_FOR_PICKUP", label: "Ready for Pickup", color: "cyan" },
  { value: "SHIPPED", label: "Shipped", color: "geekblue" },
  { value: "DELIVERED", label: "Delivered", color: "green" },
  { value: "ENDED", label: "Ended", color: "default" },
  { value: "CANCELLED", label: "Cancelled", color: "red" },
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
