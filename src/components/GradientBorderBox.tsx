import { cn } from '@/utils/cn';

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
  return (
    <div className={cn('relative', className)} onClick={onClick}>
      <div className={cn('absolute inset-[-1px] rounded black-gradient-border z-0', gradientClassName)} />
      {children}
    </div>
  );
}