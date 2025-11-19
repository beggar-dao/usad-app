import { useInView } from '@react-spring/web';
import { useEffect, useState } from 'react';

export default function AnimatedContent({
  content = '',
  className = '',
  animateClassName = '',
  children,
  id = '',
}: {
  className?: string;
  content?: string | React.ReactNode;
  animateClassName?: string;
  children?: React.ReactNode;
  id?: string;
}) {
  const [ref, inView] = useInView({
    threshold: 0.1, // 触发动画的可见度阈值
  });
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    // console.log('inView', inView);
    setStartAnimation(inView); // 重置动画
  }, [inView]);

  return (
    <div
      ref={ref}
      id={id}
      className={`${className} ${
        startAnimation ? `animate__animated ${animateClassName}` : ''
      }`}
      dangerouslySetInnerHTML={{ __html: children || content }}
    ></div>
  );
}
