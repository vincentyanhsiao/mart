import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import ArtList from './pages/ArtList';
import ArtDetail from './pages/ArtDetail';
import UserAgreement from './pages/UserAgreement';
import PrivacyPolicy from './pages/PrivacyPolicy';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#000000',
          borderRadius: 0,
          fontFamily: '"Noto Sans SC", Inter, system-ui, sans-serif',
        },
        components: {
          Button: {
            borderRadius: 0,
            controlHeight: 40,
          },
          Card: {
            borderRadiusLG: 0,
          },
          Menu: {
            itemBorderRadius: 0,
            activeBarBorderWidth: 0,
          }
        }
      }}
    >
      <Router>
        <div className="min-h-screen flex flex-col bg-white">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<ArtList />} />
              <Route path="/artwork/:id" element={<ArtDetail />} />
              <Route path="/user-agreement" element={<UserAgreement />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              {/* 兜底路由 */}
              <Route path="*" element={<ArtList />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ConfigProvider>
  );
}
