import React from 'react';
import { Layout, Typography } from 'antd';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const UserAgreement: React.FC = () => {
  return (
    <Layout className="bg-white min-h-screen">
      <Content className="px-4 md:px-8 py-12 md:py-20 max-w-4xl mx-auto w-full">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <Title level={1} className="font-serif !text-4xl">用户协议</Title>
            <p className="text-gray-400 uppercase tracking-widest text-xs">User Agreement</p>
          </div>

          <div className="prose prose-gray max-w-none space-y-8 text-gray-600 leading-relaxed">
            <section className="space-y-4">
              <Title level={4} className="font-serif">1. 协议确认</Title>
              <Paragraph>
                欢迎使用 FUHUNG PRIVATE SALES（以下简称“本平台”）。在您使用本平台提供的各项服务之前，请务必仔细阅读并充分理解本《用户协议》（以下简称“本协议”）。当您访问或使用本平台，即表示您已阅读、理解并同意受本协议所有条款的约束。
              </Paragraph>
            </section>

            <section className="space-y-4">
              <Title level={4} className="font-serif">2. 服务内容</Title>
              <Paragraph>
                本平台主要提供高端艺术品的展示、私人洽购咨询及相关艺术顾问服务。平台展示的所有艺术品信息仅供参考，最终交易条款以双方签署的正式书面协议为准。
              </Paragraph>
            </section>

            <section className="space-y-4">
              <Title level={4} className="font-serif">3. 用户行为准则</Title>
              <Paragraph>
                用户在使用本平台服务时，必须遵守中华人民共和国相关法律法规，不得利用本平台从事任何违法违规活动，包括但不限于发布虚假信息、侵犯他人知识产权等。
              </Paragraph>
            </section>

            <section className="space-y-4">
              <Title level={4} className="font-serif">4. 私人洽购说明</Title>
              <Paragraph>
                “私人洽购”服务具有高度的私密性。用户通过平台发起的咨询将由专业艺术顾问跟进。平台将尽力确保展示信息的准确性，但不保证所有艺术品在任何时刻均处于可售状态。
              </Paragraph>
            </section>

            <section className="space-y-4">
              <Title level={4} className="font-serif">5. 免责声明</Title>
              <Paragraph>
                本平台不对因网络状况、通讯线路、第三方网站或不可抗力导致的任何直接或间接损失承担责任。平台保留随时修改或中断服务而不需通知用户的权利。
              </Paragraph>
            </section>

            <section className="space-y-4">
              <Title level={4} className="font-serif">6. 协议修改</Title>
              <Paragraph>
                本平台有权根据法律法规的变化及运营需要随时修改本协议。修改后的协议一旦在平台上公布即生效。建议用户定期查看本协议。
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

export default UserAgreement;
