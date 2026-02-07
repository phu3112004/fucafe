interface Banner {
  _id: string;
  title: string;
  imageUrl: string;
  linkTo: string;
}
interface BannerFormData {
  title: string;
  imageUrl: string;
  linkTo: string;
}
export type { Banner, BannerFormData };
