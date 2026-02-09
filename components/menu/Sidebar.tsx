import { sidebarCategories } from "@/const/product-const";
const Sidebar = ({
  activeCategory,
  setActiveCategory,
}: {
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="border rounded h-fit sticky top-[60px] left-0 w-full flex flex-col space-y-2 p-2">
      {sidebarCategories.map((category) => (
        <button
          key={category.value}
          className={`p-2 hover:bg-gray-100 cursor-pointer ${activeCategory === category.value ? "bg-gray-200" : ""}`}
          onClick={() => setActiveCategory(category.value)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};
export default Sidebar;
