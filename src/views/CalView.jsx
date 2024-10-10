import React from 'react';

const CalView = ({ selectedOption }) => {
  return (
    <div>
      <h1>Calculator Mode</h1>
      <p>선택한 옵션: {selectedOption}</p>
    </div>
  );
};

export default CalView;
