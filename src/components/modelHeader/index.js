import React, { Component } from 'react';
// import { init_app } from '../../myB4W/b4wInit';
import './index.scss';

class index extends Component {
    componentWillMount() {
        // init_app();
    }

    render() {
        return (
            <div className="dContainer">
                <div className="b4w" id="b4w"></div>
                <div id="logo_container"></div>
                <div id="preloader_cont">
                    <div id="prelod_static_path">
                    <div id="prelod_dynamic_path"></div>
                    <span></span>
                    </div>
                </div>
            </div>
        );
    }
}

export default index;