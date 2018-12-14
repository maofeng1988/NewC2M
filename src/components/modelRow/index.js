import React, { Component } from 'react';
import ModelItem from '../modelItem';
import ColorItem from '../colorItem';
import RowHeader from '../rowHeader';
import './index.scss';

class ModelRow extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       showDetail: true,
    };
  };
  
  render() {
    const { title, container, selectValue, clickItem, type } = this.props;
    const { showDetail } = this.state;
    const Item = type === 'color' ? ColorItem : ModelItem;
    const selectIndex = container.findIndex((item) => item.ecode === selectValue);
    return (
      <div className="model-row-item">
        <RowHeader title={title} value={selectIndex !== -1 ? container[selectIndex].name : ''} show={!showDetail} onClick={() => this.setState({ showDetail: !this.state.showDetail })} />
        {showDetail && 
          <div className="itemDetail">
            {container.map((item, index) => (
              <Item {...item} select={selectIndex === index} onClick={() => clickItem(item, index)} color={item.colorHex} />
            ))}
          </div>
        }
      </div>
    );
  }
}

export default ModelRow;