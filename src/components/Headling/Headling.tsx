import cn from 'classnames';
import { HeadlingProps } from './Headling.props';
import styles from './Headling.module.css';

export const Headling = function Headling({ children, className, ...props }: HeadlingProps) {
  return (
    <h1 className={cn(className, styles['h1'])} {...props}>
      {children}
    </h1>
  );
};
