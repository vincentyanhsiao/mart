import React from 'react';
import { Layout, Typography } from 'antd';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const PrivacyPolicy: React.FC = () => {
  return (
    <Layout className="bg-white min-h-screen">
      <Content className="px-4 md:px-8 py-12 md:py-20 max-w-4xl mx-auto w-full">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <Title level={1} className="font-serif !text-4xl">隐私条款</Title>
            <p className="text-gray-400 uppercase tracking-widest text-xs">Privacy Policy</p>
          </div>

          <div className="prose prose-gray max-w-none space-y-8 text-gray-600 leading-relaxed">
            <section className="space-y-4">
              <Title level={4} className="font-serif">1. 信息收集</Title>
              <Paragraph>
                在您使用 FUHUNG PRIVATE SALES 服务的过程中，我们可能会收集您的个人信息，包括但不限于：姓名、联系电话、电子邮箱、微信账号以及您在咨询过程中主动提供的收藏偏好等。
              </Paragraph>
            </section>

            <section className="space-y-4">
              <Title level={4} className="font-serif">2. 信息用途</Title>
              <Paragraph>
                我们收集的信息主要用于：为您提供专业的艺术顾问咨询服务；向您推送符合您偏好的艺术品信息；优化我们的平台体验；以及履行法律法规要求的合规义务。
              </Paragraph>
            </section>

            <section className="space-y-4">
              <Title level={4} className="font-serif">3. 信息保护</Title>
              <Paragraph>
                我们高度重视您的隐私安全。我们采用符合行业标准的加密技术和安全措施来保护您的个人信息，防止未经授权的访问、披露、修改或损坏。
              </Paragraph>
            </section>

            <section className="space-y-4">
              <Title level={4} className="font-serif">4. 信息共享</Title>
              <Paragraph>
                除非获得您的明确同意，我们不会向任何第三方出售或转让您的个人信息。但在法律要求或为了完成您请求的交易（如物流配送）时，我们可能会在必要范围内共享相关信息。
              </Paragraph>
            </section>

            <section className="space-y-4">
              <Title level={4} className="font-serif">5. Cookie 使用</Title>
              <Paragraph>
                本平台可能使用 Cookie 技术来提升用户体验。您可以根据浏览器设置拒绝 Cookie，但这可能会影响您使用平台的部分功能。
              </Paragraph>
            </section>

            <section className="space-y-4">
              <Title level={4} className="font-serif">6. 您的权利</Title>
              <Paragraph>
                您有权随时联系我们查询、更正或删除您的个人信息。如有任何隐私相关的疑问，请通过平台提供的联系方式与我们的隐私专员取得联系。
              </Paragraph>
            </section>
          </div>

          <div className="pt-12 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-widest">最后更新日期：2026年3月4日</p>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default PrivacyPolicy;
