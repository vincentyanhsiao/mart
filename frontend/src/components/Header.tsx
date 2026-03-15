import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';

const { Header: AntHeader } = Layout;

export const Header: React.FC = () => {
  return (
    <header className="bg-black px-4 md:px-8 flex items-center justify-center sticky top-0 z-50 h-[88px] w-full shadow-2xl">
      <div className="flex items-center">
        <Link to="/" className="text-3xl font-logo font-bold tracking-[0.15em] text-white hover:opacity-80 transition-opacity uppercase">
          FUHUNG
        </Link>
      </div>
    </header>
  );
};
