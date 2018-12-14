import React from 'react';
import './index.scss';

const ModelItem = ({ name, lineDraftUrl, select, onClick }) => {
  return (
    <div className="detailContain" onClick={onClick}>
      <img className="detailICon" alt="isImage" src={require("../../63caa7a18ab08814178f964ee3202d02.png")}/>
      <div className={select ? "detailTitle selectTitle" : "detailTitle"}>{name}</div>
      {select && 
        <div className="selectView">
          <img alt="isImage" src={lineDraftUrl || require("../../images/select_Icon.svg")} className="selectIcon"/>
        </div>
      }
    </div>
  );
};

export default ModelItem;