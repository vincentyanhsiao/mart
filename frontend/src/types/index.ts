export interface Artist {
  name: string;
  birthYear?: string;
  gender?: string;
}

export interface Artwork {
  id: string;
  titleCn: string;
  titleEn: string;
  artist: Artist;
  category: string;
  departmentId: string;
  price: string;
  priceStatus: 'fixed' | 'inquiry';
  isPrivateSales: boolean;
  imageUrl: string;
  releaseTime: string;
  description?: string;
  dimensions?: string;
  medium?: string;
  country?: string;
}

export interface Department {
  id: string;
  name: string;
}

export interface Consultant {
  name: string;
  wechat: string;
  email: string;
  avatar: string;
}
