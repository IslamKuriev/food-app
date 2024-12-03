import cn from 'classnames';
import styles from './Search.module.css';
import { forwardRef } from 'react';
import { SearchProps } from './Search.props';
export const Search = forwardRef<HTMLInputElement, SearchProps>(function Input(
  { className, isValid, ...props },
  ref,
) {
  return (
    <div className={styles['input-wrapper']}>
      <input
        ref={ref}
        className={cn(styles['input'], className, {
          [styles['invalid']]: isValid,
        })}
        {...props}
      />
      <img className={styles['icon']} src="/search.svg" alt="Иконка поиска" />
    </div>
  );
});
