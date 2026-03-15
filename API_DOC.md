# FUHUNG PRIVATE SALES 艺术品展示系统 - 接口文档

## 1. 基础信息
- **Base URL**: `/api` (生产环境请替换为实际后端地址)
- **Content-Type**: `application/json`

## 2. 接口列表

### 2.1 获取艺术部门列表
- **URL**: `/departments`
- **Method**: `GET`
- **返回格式**:
```json
[
  { "id": "1", "name": "中国书画" },
  { "id": "2", "name": "现当代艺术" }
]
```

### 2.2 获取艺术品列表
- **URL**: `/artworks`
- **Method**: `GET`
- **查询参数**:
  - `departmentId` (string, 可选): 部门ID筛选
  - `page` (number, 默认1): 页码
  - `pageSize` (number, 默认12): 每页数量
  - `loadall` (boolean, 可选): 是否加载全部
  - `sort` (string, 默认 "releaseTime_desc"): 排序维度
- **返回格式**:
```json
{
  "total": 100,
  "list": [
    {
      "id": "1",
      "titleCn": "作品名",
      "titleEn": "Title",
      "artist": { "name": "艺术家", "birthYear": "1900" },
      "category": "油画",
      "price": "价格待询",
      "priceStatus": "inquiry",
      "isPrivateSales": true,
      "imageUrl": "url",
      "releaseTime": "2024-03-01"
    }
  ]
}
```

### 2.3 获取艺术品详情
- **URL**: `/artworks/:id`
- **Method**: `GET`
- **返回格式**:
```json
{
  "id": "1",
  "titleCn": "作品名",
  "artist": { "name": "艺术家" },
  "description": "详细描述...",
  "dimensions": "100x80cm",
  "medium": "布面油画",
  "price": "价格待询",
  "priceStatus": "inquiry"
}
```
