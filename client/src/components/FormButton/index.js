import React from 'react';
import { Button } from 'react-bootstrap';

const FormButton = props => {
  const {
    children,
    type,
    href,
    variant = 'primary',
    size,
    className = null,
    loading = false,
    block = false,
    disabled = false,
    align,
    onClick,
  } = props;
  return (
    <p
      className={
        align === 'center'
          ? 'text-center'
          : align === 'right'
          ? 'text-right'
          : 'text-left'
      }
    >
      <Button
        type={type}
        href={href}
        size={size}
        variant={variant}
        className={`${block && 'btn-block'} ${className}`}
        onClick={onClick}
        disabled={disabled || loading}
      >
        {!loading ? children : 'Loading...'}
      </Button>
    </p>
  );
};

export default FormButton;
