import { useInView } from '@react-spring/web';
import { useEffect, useState } from 'react';

interface Props {
  className?: string;
  animateClassName?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function AnimatedImg({
  className = '',
  animateClassName = '',
  children,
  onClick,
}: Props) {
  const [ref, inView] = useInView({
    threshold: 0.3,
  });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [hasAnimated, inView]);

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`${className} ${
        hasAnimated ? `animate__animated ${animateClassName}` : ''
      }`}
    >
      {children}
    </div>
  );
}
