import { cn } from '@/utils/cn';
import { useResponsive } from 'ahooks';

interface Props {
  children: React.ReactNode;
  className?: string;
  gradientClassName?: string;
  onClick?: () => void;
}

export default function GradientBorderBox({
  children,
  className,
  gradientClassName,
  onClick,
}: Props) {
  const responsive = useResponsive();
  const isMobile = !responsive.sm

  return (
    <div className={cn('relative', className)} onClick={onClick}>
      <div className={cn('absolute inset-[-1px] rounded black-gradient-border z-0', isMobile ? 'hidden' : 'block', gradientClassName)} />
      {children}
    </div>
  );
}