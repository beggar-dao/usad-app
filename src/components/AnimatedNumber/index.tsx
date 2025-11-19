import { animated, useInView, useSpring } from '@react-spring/web';
import { useEffect, useState } from 'react';

interface AnimatedNumberProps {
  value: number;
  duration?: number; // 动画持续时间（可选）
  decimals?: number;
}

export default function AnimatedNumber({
  value,
  duration = 1000,
  decimals = 0,
}: AnimatedNumberProps) {
  const [ref, inView] = useInView({
    threshold: 0.1, // 触发动画的可见度阈值
  });
  const [startAnimation, setStartAnimation] = useState(false);
  const { number } = useSpring({
    from: { number: 0 }, // 起始值
    to: { number: startAnimation ? value : 0 }, // 目标值
    config: { duration }, // 动画持续时间
  });

  useEffect(() => {
    // console.log('inView', inView);
    setStartAnimation(inView); // 重置动画
  }, [inView]);

  return (
    <animated.span ref={ref}>
      {number.to((val) => val.toFixed(decimals))}
    </animated.span>
  );
}
