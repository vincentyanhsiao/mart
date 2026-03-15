import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Row, Col, Button, Tag, Modal, Spin, Breadcrumb, Divider } from 'antd';
import { ChevronLeft, MessageCircle, Mail, User, ArrowRight } from 'lucide-react';
import { artworkService } from '../services/artworkService';
import { Artwork, Consultant } from '../types';
import { motion } from 'motion/react';

const { Content } = Layout;

const ArtDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const consultant: Consultant = {
    name: '陈经理',
    wechat: 'FUHUNG_ART_01',
    email: 'consultant@fuhung.com',
    avatar: 'https://picsum.photos/seed/consultant/200/200'
  };

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await artworkService.getArtworkDetail(id);
        if (data) {
          setArtwork(data);
        } else {
          // 处理未找到的情况
        }
      } catch (error) {
        console.error('Failed to fetch artwork detail', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <p className="text-gray-500">未找到相关艺术品信息</p>
        <Button onClick={() => navigate('/')}>返回列表</Button>
      </div>
    );
  }

  return (
    <Layout className="bg-white min-h-screen">
      <Content className="px-4 md:px-8 py-8 md:py-10 max-w-7xl mx-auto w-full">
        <div 
          className="mb-8 flex items-center gap-1 text-xs uppercase tracking-widest text-gray-400 cursor-pointer hover:text-black transition-colors w-fit"
          onClick={() => navigate('/')}
        >
          <ChevronLeft size={14} />
          <span>返回</span>
        </div>

        <Row gutter={[48, 32]}>
          {/* Image Section */}
          <Col xs={24} lg={14}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 aspect-[3/4] overflow-hidden flex items-center justify-center"
            >
              <img
                src={artwork.imageUrl}
                alt={artwork.titleCn}
                className="max-w-full max-h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </Col>

          {/* Info Section */}
          <Col xs={24} lg={10}>
            <div className="sticky top-24 space-y-6">
              <div className="pb-2 border-b border-gray-100">
                <h1 className="text-4xl font-sans font-medium text-gray-900 leading-tight">
                  {artwork.titleCn}
                </h1>
              </div>

              <div className="py-1">
                <div className="grid grid-cols-2 gap-y-4 text-sm">
                  <div>
                    <p className="text-gray-400 uppercase tracking-widest text-[10px] mb-0.5">艺术家</p>
                    <p className="font-medium text-gray-900">{artwork.artist.name} {artwork.artist.birthYear && `(${artwork.artist.birthYear})`}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 uppercase tracking-widest text-[10px] mb-0.5">国家</p>
                    <p className="font-medium text-gray-900">{artwork.country || '见详情'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 uppercase tracking-widest text-[10px] mb-0.5">性别</p>
                    <p className="font-medium text-gray-900">{artwork.artist.gender || '见详情'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 uppercase tracking-widest text-[10px] mb-0.5">品类</p>
                    <p className="font-medium text-gray-900">{artwork.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 uppercase tracking-widest text-[10px] mb-0.5">尺寸</p>
                    <p className="font-medium text-gray-900">{artwork.dimensions || '见详情'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 uppercase tracking-widest text-[10px] mb-0.5">媒介</p>
                    <p className="font-medium text-gray-900">{artwork.medium || '见详情'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-2">
                <Button
                  type="primary"
                  size="large"
                  block
                  className="h-14 bg-black border-none rounded-none text-sm uppercase tracking-widest font-medium hover:!bg-gray-800"
                  onClick={() => setIsModalOpen(true)}
                >
                  私人洽购
                </Button>
                
                <div className="bg-gray-50 p-6 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-widest">作品描述</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {artwork.description || '暂无详细描述。这件作品代表了艺术家在该时期的典型风格，具有极高的收藏与学术价值。'}
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Content>

      {/* Consultant Modal */}
      <Modal
        title={null}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        width={400}
        className="consultant-modal"
      >
        <div className="py-8 px-4 text-center space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-medium text-gray-900">{consultant.name}</h3>
          </div>
          
          <Divider className="my-4" />
          
          <div className="space-y-4 text-left">
            <div className="p-4 bg-gray-50 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <MessageCircle size={18} className="text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">微信咨询</p>
                  <p className="text-sm font-medium font-mono">{consultant.wechat}</p>
                </div>
              </div>
              <div className="flex justify-center bg-white p-2 border border-gray-100">
                {/* 模拟二维码图片 */}
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=FUHUNG_ART_01" 
                  alt="WeChat QR Code" 
                  className="w-32 h-32"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Mail size={18} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">邮件咨询</p>
                <p className="text-sm font-medium font-mono">{consultant.email}</p>
              </div>
              <ArrowRight size={14} className="text-gray-300 group-hover:text-black transition-colors" />
            </div>
          </div>

          <p className="text-[10px] text-gray-400 leading-relaxed">
            我们的顾问将在 24 小时内回复您的咨询。<br />
            感谢您对复泓艺术的关注。
          </p>
        </div>
      </Modal>
    </Layout>
  );
};

export default ArtDetail;
