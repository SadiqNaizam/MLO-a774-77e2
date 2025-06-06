import React from 'react';
import { cn } from '@/lib/utils';

interface ThemedSectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const ThemedSectionHeader: React.FC<ThemedSectionHeaderProps> = ({
  title,
  subtitle,
  className,
  ctaText,
  onCtaClick
}) => {
  console.log("Rendering ThemedSectionHeader with title:", title);
  return (
    <div className={cn('py-4 mb-4 flex justify-between items-center', className)}>
      <div>
        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
        {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
      </div>
      {ctaText && onCtaClick && (
        <button
          onClick={onCtaClick}
          className="text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors"
        >
          {ctaText}
        </button>
      )}
    </div>
  );
};

export default ThemedSectionHeader;