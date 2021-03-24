import React, { useRef, useEffect, TextareaHTMLAttributes } from 'react';

import { useField } from '@unform/core';

interface Props {
  name: string;
  label?: string;
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & Props;

function TextArea({ name, label, ...rest }: TextareaProps) {
  const textareaRef = useRef(null);
  const { fieldName, defaultValue = '', registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textareaRef,
      getValue: (ref) => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: (ref) => {
        ref.current.value = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <div>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <textarea
        ref={textareaRef}
        id={fieldName}
        defaultValue={defaultValue}
        {...rest}
      />

      {error && <span>{error}</span>}
    </div>
  );
}

export default TextArea;
