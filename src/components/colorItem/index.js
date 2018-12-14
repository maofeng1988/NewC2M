import React from 'react';
import './index.scss';

const ColorItem = ({ color, name, select, onClick }) => {
  debugger
  return (
    <div className="color-item-container" onClick={onClick}>
      <div className={select ? 'bgView selectBg' : 'bgView'}>
        <div className="color" style={{ backgroundColor: color || 'red' }}/>
        <div className={select ? 'title selectTt' : 'title'}>{name}</div>
      </div>
    </div>
  );
};

export default ColorItem;