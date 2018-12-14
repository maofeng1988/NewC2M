import React from 'react';
import './index.scss';

const selectBar = ({ contentArr, selectIndex, clickItem, saveAction }) => {
	return (
			<div className="select-bar-container">
        <div className="content">
          {contentArr.map((item, index) => {
            return (
              <div className="item" key={index} onClick={() => clickItem(index)}>
                <div className={index === selectIndex ? 'itemTitle select' : 'itemTitle'}>{item}</div>
              </div>
            );
          })}
        </div>
        <div className="save" onClick={saveAction}>保存</div>
			</div>
	);
};

export default selectBar;