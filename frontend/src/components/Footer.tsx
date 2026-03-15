import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 uppercase tracking-widest">
          <p>© 2026 FUHUNG PRIVATE SALES.</p>
          <div className="flex gap-6">
            <Link to="/user-agreement" className="hover:text-white transition-colors">用户协议</Link>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">隐私条款</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
