import React from 'react';
import styled from 'styled-components';

function SelectBox({ items, setValue }) {
  const handleChange = e => {
    // console.log(e.target.value);
    setValue(e.target.value);
  };
  // console.log(items);
  return (
    <>
      <Select onChange={handleChange}>
        {items.map(item => {
          return (
            <option key={item.id} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </Select>
    </>
  );
}
const Select = styled.select`
  padding: 5px;
  height: 45px;
  borderL 1px solid #d8d9db;
  margin-right: 20px;
`;
export default SelectBox;
