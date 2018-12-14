import React from 'react';
import './index.scss';

const RowHeader = ({ title, value, show, onClick }) => {
  return (
    <div className="model-row-header">
      <div className="title">{title}</div>
      <div className="value">{show ? value : ''}</div>
      <div className="arrowContain" onClick={onClick}>
        <img className="arrow" alt="isImage" src={show ? require('../../images/arrow_down.svg') : require('../../images/arrow_up.svg')} />
      </div>
    </div>
  );
};

export default RowHeader;