import axios from 'axios';
import { Artwork, Department } from '../types';

// 模拟 API 基础路径，实际开发时请替换为真实后端地址
const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const artworkService = {
  // 获取艺术品列表
  getArtworks: async (params: {
    departmentId?: string | null;
    page?: number;
    pageSize?: number;
    loadall?: boolean;
    sort?: string;
  }) => {
    try {
      const response = await api.get('/artworks', { params });
      if (response.data && response.data.code === 200) {
        return response.data.data.map((item: any) => ({
          id: String(item.id),
          titleCn: item.title,
          titleEn: item.title,
          artist: { name: item.artist },
          category: '综合',
          departmentId: '1',
          price: '价格待询',
          priceStatus: 'inquiry',
          isPrivateSales: true,
          imageUrl: item.image_url,
          releaseTime: item.create_time,
          description: item.description,
          medium: '不限',
          country: '不限'
        }));
      }
      return mockArtworks;
    } catch (error) {
      console.error('获取艺术品列表失败，使用降级数据', error);
      return mockArtworks;
    }
  },

  // 获取艺术品详情
  getArtworkDetail: async (id: string) => {
    try {
      const response = await api.get(`/artworks/${id}`);
      if (response.data && response.data.code === 200) {
        const item = response.data.data;
        return {
          id: String(item.id),
          titleCn: item.title,
          titleEn: item.title,
          artist: { name: item.artist },
          category: '综合',
          departmentId: '1',
          price: '价格待询',
          priceStatus: 'inquiry',
          isPrivateSales: true,
          imageUrl: item.image_url,
          releaseTime: item.create_time,
          description: item.description,
          medium: '不限',
          country: '不限'
        };
      }
      return mockArtworks.find(item => item.id === id);
    } catch (error) {
      console.error('获取艺术品详情失败，使用降级数据', error);
      return mockArtworks.find(item => item.id === id);
    }
  },

  // 获取部门列表 (分类)
  getDepartments: async () => {
    return [
      { id: '1', name: '中国书画' },
      { id: '2', name: '现当代艺术' },
      { id: '3', name: '瓷器杂项' },
      { id: '4', name: '珠宝尚品' },
    ];
  },

  // 获取艺术家列表
  getArtists: async () => {
    return ['赵无极', '张大千', '吴冠中', '清乾隆', '齐白石', '徐悲鸿'];
  },

  // 获取材质/媒介列表
  getMediums: async () => {
    return ['布面油画', '纸本设色', '瓷器', '水墨', '雕塑'];
  },

  // 获取国家/地区列表
  getCountries: async () => {
    return ['中国', '法国', '美国', '日本', '英国'];
  }
};

// 模拟数据
const mockArtworks: Artwork[] = [
  {
    id: '1',
    titleCn: '无题',
    titleEn: 'Untitled',
    artist: { name: '赵无极', birthYear: '1920', gender: '男' },
    category: '油画',
    departmentId: '2',
    price: '价格待询',
    priceStatus: 'inquiry',
    isPrivateSales: true,
    imageUrl: 'https://picsum.photos/seed/art1/600/800',
    releaseTime: '2024-03-01',
    dimensions: '100 x 80 cm',
    medium: '布面油画',
    country: '法国',
    description: '这件作品展现了艺术家晚期对空间与光影的极致探索。'
  },
  {
    id: '2',
    titleCn: '山水清音',
    titleEn: 'Sound of Mountains',
    artist: { name: '张大千', birthYear: '1899', gender: '男' },
    category: '国画',
    departmentId: '1',
    price: '¥2,800,000',
    priceStatus: 'fixed',
    isPrivateSales: true,
    imageUrl: 'https://picsum.photos/seed/art2/600/800',
    releaseTime: '2024-02-15',
    dimensions: '136 x 68 cm',
    medium: '纸本设色',
    country: '中国',
    description: '泼彩山水的巅峰之作，气势恢宏。'
  },
  {
    id: '3',
    titleCn: '春之祭',
    titleEn: 'Le Sacre du printemps',
    artist: { name: '吴冠中', birthYear: '1919', gender: '男' },
    category: '油画',
    departmentId: '2',
    price: '价格待询',
    priceStatus: 'inquiry',
    isPrivateSales: true,
    imageUrl: 'https://picsum.photos/seed/art3/600/800',
    releaseTime: '2024-01-20',
    medium: '布面油画',
    country: '中国',
  },
  {
    id: '4',
    titleCn: '青花缠枝莲纹瓶',
    titleEn: 'Blue and White Vase',
    artist: { name: '清乾隆', birthYear: '', gender: '男' },
    category: '瓷器',
    departmentId: '3',
    price: '¥1,200,000',
    priceStatus: 'fixed',
    isPrivateSales: true,
    imageUrl: 'https://picsum.photos/seed/art4/600/800',
    releaseTime: '2024-03-05',
    medium: '瓷器',
    country: '中国',
  },
  {
    id: '5',
    titleCn: '墨竹图',
    titleEn: 'Ink Bamboo',
    artist: { name: '齐白石', birthYear: '1864', gender: '男' },
    category: '国画',
    departmentId: '1',
    price: '价格待询',
    priceStatus: 'inquiry',
    isPrivateSales: true,
    imageUrl: 'https://picsum.photos/seed/art5/600/800',
    releaseTime: '2024-03-10',
    medium: '水墨',
    country: '中国',
  },
  {
    id: '6',
    titleCn: '奔马图',
    titleEn: 'Galloping Horse',
    artist: { name: '徐悲鸿', birthYear: '1895', gender: '男' },
    category: '国画',
    departmentId: '1',
    price: '价格待询',
    priceStatus: 'inquiry',
    isPrivateSales: true,
    imageUrl: 'https://picsum.photos/seed/art6/600/800',
    releaseTime: '2024-03-12',
    medium: '水墨',
    country: '中国',
  },
  {
    id: '7',
    titleCn: '抽象构成',
    titleEn: 'Abstract Composition',
    artist: { name: '朱德群', birthYear: '1920', gender: '男' },
    category: '油画',
    departmentId: '2',
    price: '价格待询',
    priceStatus: 'inquiry',
    isPrivateSales: true,
    imageUrl: 'https://picsum.photos/seed/art7/600/800',
    releaseTime: '2024-03-15',
    medium: '布面油画',
    country: '法国',
  },
  {
    id: '8',
    titleCn: '红钻项链',
    titleEn: 'Red Diamond Necklace',
    artist: { name: 'Harry Winston', birthYear: '', gender: '男' },
    category: '珠宝',
    departmentId: '4',
    price: '价格待询',
    priceStatus: 'inquiry',
    isPrivateSales: true,
    imageUrl: 'https://picsum.photos/seed/art8/600/800',
    releaseTime: '2024-03-18',
    medium: '珠宝',
    country: '美国',
  },
  {
    id: '9',
    titleCn: '静物',
    titleEn: 'Still Life',
    artist: { name: '常玉', birthYear: '1001', gender: '男' },
    category: '油画',
    departmentId: '2',
    price: '价格待询',
    priceStatus: 'inquiry',
    isPrivateSales: true,
    imageUrl: 'https://picsum.photos/seed/art9/600/800',
    releaseTime: '2024-03-20',
    medium: '布面油画',
    country: '法国',
  },
  {
    id: '10',
    titleCn: '粉彩百鹿尊',
    titleEn: 'Famille Rose Vase',
    artist: { name: '清乾隆', birthYear: '', gender: '男' },
    category: '瓷器',
    departmentId: '3',
    price: '价格待询',
    priceStatus: 'inquiry',
    isPrivateSales: true,
    imageUrl: 'https://picsum.photos/seed/art10/600/800',
    releaseTime: '2024-03-22',
    medium: '瓷器',
    country: '中国',
  },
  {
    id: '11',
    titleCn: '荷花',
    titleEn: 'Lotus',
    artist: { name: '潘天寿', birthYear: '1897', gender: '男' },
    category: '国画',
    departmentId: '1',
    price: '价格待询',
    priceStatus: 'inquiry',
    isPrivateSales: true,
    imageUrl: 'https://picsum.photos/seed/art11/600/800',
    releaseTime: '2024-03-25',
    medium: '水墨',
    country: '中国',
  },
  {
    id: '12',
    titleCn: '无限网',
    titleEn: 'Infinity Nets',
    artist: { name: '草间弥生', birthYear: '1929', gender: '女' },
    category: '油画',
    departmentId: '2',
    price: '价格待询',
    priceStatus: 'inquiry',
    isPrivateSales: true,
    imageUrl: 'https://picsum.photos/seed/art12/600/800',
    releaseTime: '2024-03-28',
    medium: '布面丙烯',
    country: '日本',
  },
  {
    id: '13',
    titleCn: '百鸟朝凤',
    titleEn: 'Birds Paying Homage to the Phoenix',
    artist: { name: '佚名', birthYear: '', gender: '未知' },
    category: '国画',
    departmentId: '1',
    price: '价格待询',
    priceStatus: 'inquiry',
    isPrivateSales: true,
    imageUrl: 'https://picsum.photos/seed/art13/600/800',
    releaseTime: '2024-04-01',
    medium: '绢本设色',
    country: '中国',
  },
  {
    id: '14',
    titleCn: '翡翠手镯',
    titleEn: 'Jadeite Bangle',
    artist: { name: '私人收藏', birthYear: '', gender: '未知' },
    category: '珠宝',
    departmentId: '4',
    price: '价格待询',
    priceStatus: 'inquiry',
    isPrivateSales: true,
    imageUrl: 'https://picsum.photos/seed/art14/600/800',
    releaseTime: '2024-04-03',
    medium: '珠宝',
    country: '中国',
  },
  {
    id: '15',
    titleCn: '构成',
    titleEn: 'Composition',
    artist: { name: '蒙德里安', birthYear: '1872', gender: '男' },
    category: '油画',
    departmentId: '2',
    price: '价格待询',
    priceStatus: 'inquiry',
    isPrivateSales: true,
    imageUrl: 'https://picsum.photos/seed/art15/600/800',
    releaseTime: '2024-04-05',
    medium: '布面油画',
    country: '荷兰',
  },
  {
    id: '16',
    titleCn: '青铜鼎',
    titleEn: 'Bronze Ding',
    artist: { name: '商代', birthYear: '', gender: '未知' },
    category: '杂项',
    departmentId: '3',
    price: '价格待询',
    priceStatus: 'inquiry',
    isPrivateSales: true,
    imageUrl: 'https://picsum.photos/seed/art16/600/800',
    releaseTime: '2024-04-08',
    medium: '青铜',
    country: '中国',
  },
  {
    id: '17',
    titleCn: '向日葵',
    titleEn: 'Sunflowers',
    artist: { name: '梵高', birthYear: '1853', gender: '男' },
    category: '油画',
    departmentId: '2',
    price: '价格待询',
    priceStatus: 'inquiry',
    isPrivateSales: true,
    imageUrl: 'https://picsum.photos/seed/art17/600/800',
    releaseTime: '2024-04-10',
    medium: '布面油画',
    country: '荷兰',
  },
  {
    id: '18',
    titleCn: '百马图',
    titleEn: 'One Hundred Horses',
    artist: { name: '郎世宁', birthYear: '1688', gender: '男' },
    category: '国画',
    departmentId: '1',
    price: '价格待询',
    priceStatus: 'inquiry',
    isPrivateSales: true,
    imageUrl: 'https://picsum.photos/seed/art18/600/800',
    releaseTime: '2024-04-12',
    medium: '绢本设色',
    country: '中国',
  },
  {
    id: '19',
    titleCn: '蓝钻戒指',
    titleEn: 'Blue Diamond Ring',
    artist: { name: 'Graff', birthYear: '', gender: '未知' },
    category: '珠宝',
    departmentId: '4',
    price: '价格待询',
    priceStatus: 'inquiry',
    isPrivateSales: true,
    imageUrl: 'https://picsum.photos/seed/art19/600/800',
    releaseTime: '2024-04-15',
    medium: '珠宝',
    country: '英国',
  },
  {
    id: '20',
    titleCn: '仕女图',
    titleEn: 'Court Ladies',
    artist: { name: '唐寅', birthYear: '1470', gender: '男' },
    category: '国画',
    departmentId: '1',
    price: '价格待询',
    priceStatus: 'inquiry',
    isPrivateSales: true,
    imageUrl: 'https://picsum.photos/seed/art20/600/800',
    releaseTime: '2024-04-18',
    medium: '绢本设色',
    country: '中国',
  },
  {
    id: '21',
    titleCn: '思想者',
    titleEn: 'The Thinker',
    artist: { name: '罗丹', birthYear: '1840', gender: '男' },
    category: '雕塑',
    departmentId: '2',
    price: '价格待询',
    priceStatus: 'inquiry',
    isPrivateSales: true,
    imageUrl: 'https://picsum.photos/seed/art21/600/800',
    releaseTime: '2024-04-20',
    medium: '青铜',
    country: '法国',
  },
  {
    id: '22',
    titleCn: '富春山居图',
    titleEn: 'Dwelling in the Fuchun Mountains',
    artist: { name: '黄公望', birthYear: '1269', gender: '男' },
    category: '国画',
    departmentId: '1',
    price: '价格待询',
    priceStatus: 'inquiry',
    isPrivateSales: true,
    imageUrl: 'https://picsum.photos/seed/art22/600/800',
    releaseTime: '2024-04-22',
    medium: '纸本水墨',
    country: '中国',
  },
  {
    id: '23',
    titleCn: '清明上河图',
    titleEn: 'Along the River During the Qingming Festival',
    artist: { name: '张择端', birthYear: '1085', gender: '男' },
    category: '国画',
    departmentId: '1',
    price: '价格待询',
    priceStatus: 'inquiry',
    isPrivateSales: true,
    imageUrl: 'https://picsum.photos/seed/art23/600/800',
    releaseTime: '2024-04-25',
    medium: '绢本设色',
    country: '中国',
  },
  {
    id: '24',
    titleCn: '千里江山图',
    titleEn: 'A Thousand Li of Rivers and Mountains',
    artist: { name: '王希孟', birthYear: '1096', gender: '男' },
    category: '国画',
    departmentId: '1',
    price: '价格待询',
    priceStatus: 'inquiry',
    isPrivateSales: true,
    imageUrl: 'https://picsum.photos/seed/art24/600/800',
    releaseTime: '2024-04-28',
    medium: '绢本设色',
    country: '中国',
  }
];
