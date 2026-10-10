import { ReactNode } from 'react';

interface BadgeSubtitleProps {
  children: ReactNode;
  className?: string;
}

export default function BadgeSubtitle({ children, className = '' }: BadgeSubtitleProps) {
  return (
    <span className={`eyebrow ${className}`}>
      {children}
    </span>
  );
}
