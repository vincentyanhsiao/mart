import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Spin, Empty, Button, Pagination, Select, Drawer, Tag } from 'antd';
import { Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { ArtCard } from '../components/ArtCard';
import { artworkService } from '../services/artworkService';
import { Artwork, Department } from '../types';
import { useAppStore } from '../store/useAppStore';
import { motion, AnimatePresence } from 'motion/react';

const { Content, Sider } = Layout;

const ArtList: React.FC = () => {
  const { 
    departmentId, artist, medium, country, 
    page, pageSize, loadAll, 
    setDepartmentId, setArtist, setMedium, setCountry,
    setPage, setLoadAll 
  } = useAppStore();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [artists, setArtists] = useState<string[]>([]);
  const [mediums, setMediums] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [deps, arts, meds, counts] = await Promise.all([
          artworkService.getDepartments(),
          artworkService.getArtists(),
          artworkService.getMediums(),
          artworkService.getCountries(),
        ]);
        setDepartments(deps);
        setArtists(arts);
        setMediums(meds);
        setCountries(counts);
      } catch (error) {
        console.error('Failed to fetch filter data', error);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      try {
        // 模拟分页和筛选逻辑
        const allData = await artworkService.getArtworks({ departmentId, page, pageSize, loadall: loadAll });
        
        // 模拟筛选
        let filtered = allData;
        if (departmentId) filtered = filtered.filter(item => item.departmentId === departmentId);
        if (artist) filtered = filtered.filter(item => item.artist.name === artist);
        if (medium) filtered = filtered.filter(item => item.medium === medium);
        if (country) filtered = filtered.filter(item => item.country === country);
        
        // 模拟排序 (默认发布时间倒序)
        filtered = [...filtered].sort((a, b) => new Date(b.releaseTime).getTime() - new Date(a.releaseTime).getTime());

        setTotal(filtered.length);

        // 模拟分页
        if (!loadAll) {
          const start = (page - 1) * pageSize;
          const end = start + pageSize;
          setArtworks(filtered.slice(start, end));
        } else {
          setArtworks(filtered);
        }
      } catch (error) {
        console.error('Failed to fetch artworks', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, [departmentId, artist, medium, country, page, pageSize, loadAll]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const handleDepartmentChange = (id: string | null) => {
    setDepartmentId(id);
    setIsFilterDrawerOpen(false);
  };

  return (
    <Layout className="bg-white min-h-screen">
      <Content className="px-4 md:px-8 py-8 md:py-12 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-sans font-light tracking-tight text-gray-900">
              私人洽购
            </h1>
            <p className="text-gray-500 max-w-xl">
              复泓私人洽购为您呈现全球顶级艺术珍品，提供专业、私密、高效的艺术品交易服务。
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              icon={<SlidersHorizontal size={16} />} 
              onClick={() => setIsFilterDrawerOpen(true)}
              className="flex items-center gap-2 h-10 px-6 rounded-none border-gray-200 hover:border-black hover:text-black"
            >
              筛选
            </Button>
            <Select
              defaultValue="newest"
              className="w-40 h-10 custom-select"
              bordered={false}
              suffixIcon={<ChevronDown size={14} />}
              options={[{ value: 'newest', label: '最新发布' }]}
              disabled
            />
          </div>
        </div>

        {/* Active Filters */}
        {(departmentId || artist || medium || country) && (
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-400 uppercase tracking-widest">当前筛选:</span>
            {departmentId && (
              <Tag 
                closable 
                onClose={() => setDepartmentId(null)}
                className="bg-gray-50 border-gray-200 px-3 py-1 rounded-none flex items-center gap-1"
              >
                分类: {departments.find(d => d.id === departmentId)?.name}
              </Tag>
            )}
            {artist && (
              <Tag 
                closable 
                onClose={() => setArtist(null)}
                className="bg-gray-50 border-gray-200 px-3 py-1 rounded-none flex items-center gap-1"
              >
                艺术家: {artist}
              </Tag>
            )}
            {medium && (
              <Tag 
                closable 
                onClose={() => setMedium(null)}
                className="bg-gray-50 border-gray-200 px-3 py-1 rounded-none flex items-center gap-1"
              >
                材质/媒介: {medium}
              </Tag>
            )}
            {country && (
              <Tag 
                closable 
                onClose={() => setCountry(null)}
                className="bg-gray-50 border-gray-200 px-3 py-1 rounded-none flex items-center gap-1"
              >
                国家/地区: {country}
              </Tag>
            )}
            <Button 
              type="link" 
              size="small" 
              onClick={() => {
                setDepartmentId(null);
                setArtist(null);
                setMedium(null);
                setCountry(null);
              }}
              className="text-[10px] text-gray-400 uppercase tracking-widest hover:text-black"
            >
              清除全部
            </Button>
          </div>
        )}

        {/* List Section */}
        {loading ? (
          <div className="py-32 flex justify-center">
            <Spin size="large" />
          </div>
        ) : artworks.length > 0 ? (
          <>
            <Row gutter={[24, 48]}>
              <AnimatePresence mode="popLayout">
                {artworks.map((artwork) => (
                  <Col xs={24} sm={12} lg={8} xl={6} key={artwork.id}>
                    <ArtCard artwork={artwork} />
                  </Col>
                ))}
              </AnimatePresence>
            </Row>

            {/* Pagination */}
            <div className="mt-20 flex justify-center">
              <Pagination
                current={page}
                pageSize={pageSize}
                total={total}
                onChange={(p) => setPage(p)}
                showSizeChanger={false}
                className="custom-pagination"
              />
            </div>
          </>
        ) : (
          <div className="py-32">
            <Empty description="暂无相关艺术品" />
          </div>
        )}
      </Content>

      {/* Filter Drawer */}
      <Drawer
        title={<span className="font-sans text-xl font-medium">高级筛选</span>}
        placement="right"
        onClose={() => setIsFilterDrawerOpen(false)}
        open={isFilterDrawerOpen}
        width={320}
      >
        <div className="space-y-10">
          {/* Category Section */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">分类</h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setDepartmentId(null)}
                className={`px-3 py-1.5 text-xs transition-colors border ${!departmentId ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:border-black'}`}
              >
                全部
              </button>
              {departments.map(dep => (
                <button
                  key={dep.id}
                  onClick={() => setDepartmentId(dep.id)}
                  className={`px-3 py-1.5 text-xs transition-colors border ${departmentId === dep.id ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:border-black'}`}
                >
                  {dep.name}
                </button>
              ))}
            </div>
          </div>

          {/* Artist Section */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">艺术家</h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setArtist(null)}
                className={`px-3 py-1.5 text-xs transition-colors border ${!artist ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:border-black'}`}
              >
                全部
              </button>
              {artists.map(a => (
                <button
                  key={a}
                  onClick={() => setArtist(a)}
                  className={`px-3 py-1.5 text-xs transition-colors border ${artist === a ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:border-black'}`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* Medium Section */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">材质/媒介</h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setMedium(null)}
                className={`px-3 py-1.5 text-xs transition-colors border ${!medium ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:border-black'}`}
              >
                全部
              </button>
              {mediums.map(m => (
                <button
                  key={m}
                  onClick={() => setMedium(m)}
                  className={`px-3 py-1.5 text-xs transition-colors border ${medium === m ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:border-black'}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Country Section */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">国家/地区</h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCountry(null)}
                className={`px-3 py-1.5 text-xs transition-colors border ${!country ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:border-black'}`}
              >
                全部
              </button>
              {countries.map(c => (
                <button
                  key={c}
                  onClick={() => setCountry(c)}
                  className={`px-3 py-1.5 text-xs transition-colors border ${country === c ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:border-black'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Drawer>
    </Layout>
  );
};

export default ArtList;
