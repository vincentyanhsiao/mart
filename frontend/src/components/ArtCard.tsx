import React from 'react';
import { Card, Tag } from 'antd';
import { Artwork } from '../types';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface ArtCardProps {
  artwork: Artwork;
}

export const ArtCard: React.FC<ArtCardProps> = ({ artwork }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -12 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="cursor-pointer group"
      onClick={() => navigate(`/artwork/${artwork.id}`)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-6">
        <img
          alt={artwork.titleCn}
          src={artwork.imageUrl}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        
        {/* Subtle Overlay on Hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />

        {/* Private Sales Tag */}
        {artwork.isPrivateSales && (
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-black text-white px-3 py-1 text-[9px] uppercase tracking-[0.2em] font-medium">
              私人洽购
            </div>
          </div>
        )}

        {/* Quick View Indicator (Subtle) */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>

      <div className="space-y-3 px-1">
        <div className="space-y-1">
          <h3 className="text-lg font-sans font-medium text-gray-900 leading-tight group-hover:text-black transition-colors">
            {artwork.titleCn}
          </h3>
        </div>

        <div className="pt-3 border-t border-gray-100 flex justify-between items-end">
          <div className="space-y-0.5">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">艺术家</p>
            <p className="text-xs font-medium text-gray-800">
              {artwork.artist.name}
              {artwork.artist.birthYear && (
                <span className="ml-1 text-gray-400 font-normal">({artwork.artist.birthYear})</span>
              )}
            </p>
          </div>
          
          <div className="text-right">
            <span className="text-[10px] text-black uppercase tracking-[0.15em] font-bold border-b border-black/20 pb-0.5 group-hover:border-black transition-colors">
              立即询价
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
