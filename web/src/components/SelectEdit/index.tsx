import React, {
  useRef,
  useEffect,
  ReactNode,
  SelectHTMLAttributes,
} from 'react';

import { useField } from '@unform/core';
import { SelectImput } from './styles';

interface SelectProps {
  name: string;
  children: ReactNode;
}

type Props = SelectHTMLAttributes<HTMLSelectElement> & SelectProps;

const SelectEdit: React.FC<Props> = ({ name, children, ...rest }) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      ref: selectRef,
      name: fieldName,
      getValue: (ref) => {
        return ref.current?.value;
      },
      setValue: (ref, newValue) => {
        ref.current.value = newValue;
      },
      clearValue: (ref) => {
        ref.current.value = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <SelectImput>
      <select
        id={fieldName}
        ref={selectRef}
        defaultValue={defaultValue}
        {...rest}
      >
        {children}
      </select>

      {error && <span className="error">{error}</span>}
    </SelectImput>
  );
};

export default SelectEdit;
