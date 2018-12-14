import React, { Component } from 'react';
import wx from 'weixin-js-sdk';
import { init_app, changeVisiable, changeTexture, hideObjects, changeEmbColor } from '../myB4W/b4wInit';
import './App.scss';
import ModelHeader from '../components/modelHeader';
import SelectBar from '../components/selectBar';
import ModelRow from '../components/modelRow';
import { request } from '../network';

class App extends Component {
  constructor(){
    super();
    this.state = {
      selectIndex: 0,
      selectKeys: { key1: 0, key2: 0, key3: 0 },
      contentArr: [
        // [
        //   [
        //     { key: 'key1', title: '面料', container: [{ name: '绿色面料', ecode: 0 }, { name: '绿色面料', ecode: 1 }, { name: '绿色面料', ecode: 2 }, { name: '绿色面料', ecode: 3 }, { name: '绿色面料', ecode: 4 }, { name: '绿色面料', ecode: 5 }] },
        //   ],
        //   [
        //     { key: 'key2', title: '领子', container: [
        //       { name: '领子', ecode: 0, clickAction: () => { changeVisiable('pocket_01', false); changeVisiable('pocket_02', true); } },
        //       { name: '领子', ecode: 1, clickAction: () => { changeVisiable('pocket_01', true); changeVisiable('pocket_02', false); } }
        //     ] },
        //   ],
        //   [
        //     { key: 'key3', title: '口袋', container: [{ name: '口袋', color: 'red', ecode: 0 }, { name: '口袋', color: '口袋', ecode: 1 }, { name: '口袋', color: 'black', ecode: 2 }] },
        //   ]
        // ]
      ],
    }

  }
  componentWillMount() {
    init_app();
  }

  componentDidMount() {
    // document.addEventListener('visibilitychange', this.hideOrshow);
    // document.addEventListener("beforeunload", this.hideOrshow);
    this.loadData();
  }

  componentWillUnmount() {
    wx.miniProgram.postMessage({ data: { ffdf: 'foos', name: "dadf", dsfds: 'dfadf' } });
  }


  render() {
    return (
      <div className="app-container">
        <ModelHeader />
        <SelectBar contentArr={['工艺', '刺绣印花']} selectIndex={this.state.selectIndex} clickItem={(selectIndex) => this.setState({ selectIndex })} saveActio={this.save} />
        <div className="customization">
          {/* <div onClick={() => changeTexture("Cube", "Texture.002")}>更换面料</div> */}
          {/* <SelectBar contentArr={['工艺', '刺绣印花']} selectIndex={this.state.selectIndex} clickItem={(selectIndex) => this.setState({ selectIndex })} saveActio={this.save} /> */}
          {this.state.contentArr.length > 0 && this.state.contentArr[this.state.selectIndex].map((item, index) =>{
            return (
              <div className="itemContain" key={`itemContain${index}`}>
                {item.map((item) => {
                  debugger
                  if (item.type === 'input') {
                    return <input className="input" placeholder={item.title}/>
                  } else {
                    return (
                      <ModelRow
                        {...item}
                        selectValue={this.state.selectKeys[item.key]}
                        clickItem={(rowItem) => {
                          debugger
                          rowItem.clickAction && rowItem.clickAction();
                          const selectKeys = this.state.selectKeys;
                          selectKeys[item.key] = rowItem.ecode;
                          this.setState({ selectKeys });
                        }}
                      />
                    );
                  }
                })}
              </div>
            )
          })}
          
        </div>
      </div>
    );
  }
  loadData = async () => {
    request('/product/embroideries?categoryEcode=MYR').then((res) => {
      debugger
      if (res && res.data) {
        console.log(res);
        const { embPositions, embFonts, embColors} = res.data.embroideryVo;
        const { printings } =res.data;
        console.log(printings);
        debugger
        //印花位置函数绑定
        function count() {
          var arr = [];
          for (var i=1; i<=printings.length; i++) {
              arr.push((function (n) {
                  return function () {
                    var path = "assets/printings/print_0"+n+".png"; 
                    return changeTexture("Pattern2D_315009.005","Texture.002",path);
                  }
              })(i));
          }
          return arr;
        }
        var results = count();
        console.log(results);
        debugger
        for(var i=0; i<printings.length; i++){
          printings[i].clickAction = results[i];
        }
        //刺绣位置函数绑定
        function count0() {
          var arr = [];
          for (var i=1; i<=embPositions.length; i++) {
              arr.push((function (n) {
                  return function () {
                    var path = "assets/cixiu/cixiu_0"+n+".png"; 
                    return changeTexture("Pattern2D_315009.005","Texture.004",path);
                  }
              })(i));
          }
          return arr;
        }
        var results0 = count0();
        console.log(results0);
        debugger
        for(var x=0; x<embPositions.length; x++){
          embPositions[x].clickAction = results0[x];
        }
        //刺绣字体函数绑定
        function count2() {
          var arr = [];
          for (var i=1; i<=3; i++) {
              arr.push((function (n) {
                  return function () {
                    var path = "assets/emb/cixiu_0"+n+".png"; 
                    return changeTexture("Pattern2D_315009.005","Texture.003",path);
                  }
              })(i));
          }
          return arr;
        }
        var results2 = count2();
        console.log(results2);
        debugger
        for(var a=0; a<3; a++){
          embFonts[a].clickAction = results2[a];
        }
        console.log("===========字体==============",embFonts);
        //刺绣颜色函数绑定
        function count3() {
          var arr = [];
          for (var i=0; i<embColors.length; i++) {
            // console.log(embColors);
            const convertHexToRGB = str => {
              str = str[0] === '#' ? str.slice(1) : str ;
              str = str.length === 4 ? str.slice(0,3) : str ;
              str = str.length === 3 ? str[0].repeat(2)+str[1].repeat(2)+str[2].repeat(2) : str ;
              // console.log(str);
              if ((str.length !== 6) || !(/^[0-9a-fA-F]{3,6}$/i.test(str))){ return 'Invalid data' ;}
              return [parseInt(str[0] + str[1], 16)/255, parseInt(str[2] + str[3], 16)/255, parseInt(str[4] + str[5], 16)/255];
            }
            // console.log(embColors[i]);
            var color = convertHexToRGB(embColors[i].ecode) ;
            var colorHex =  "#"+embColors[i].ecode[0].repeat(2)+embColors[i].ecode[1].repeat(2)+embColors[i].ecode[2].repeat(2);
            arr.push({color,colorHex});
          }
          return arr;
        }
        var results3 = count3();
        console.log("+++++++++",results3);
        debugger
        for(var b=0; b<embColors.length; b++){
          embColors[b].color = results3[b].color;
          embColors[b].colorHex = results3[b].colorHex;
        }
        console.log("===============yanse===============", embColors);
        function count4() {
          var arr = [];
          for (var i=0; i<=embColors.length; i++) {
              arr.push((function (n) {
                  return function () {
                    console.log(embColors[n].color);
                    debugger
                    return changeEmbColor("Pattern2D_315009.005", ["ds","RGB"], embColors[n].color);
                  }
              })(i));
          }
          return arr;
        }
        var results4 = count4();
        console.log("----------------色号",results4);
        for(var c=0; c<embColors.length; c++){
          embColors[c].clickAction = results4[c];
        }
        //
        const objects=["Pattern2D_315009.000",
                       "Pattern2D_315009.003",
                       "Pattern2D_315009.005",
                       "Pattern2D_315009.007",
                       "pocket_01",
                       "pocket_02",
                       "Pattern2D_5750432.001",
                       "Pattern2D_787255.001",
                       "987-MC5.000"];
        const contentArr = [
          [
            [
              { key: 'key1', title: '面料', container: [
                { name: '白色面料', ecode: 0 , clickAction: () =>{
                  for(var i=0; i<objects.length; i++){
                    changeTexture(objects[i],"Texture.001","assets/mianliao_white.jpg");
                  }   
                }
            }, 
                { name: '红色面料', ecode: 1 , clickAction: () =>{
                  for(var i=0; i<objects.length; i++){
                    changeTexture(objects[i],"Texture.001","assets/mianliao_red.jpg");
                  }   
                }
              }, 
                { name: '蓝色面料', ecode: 2 , clickAction: () =>{
                  for(var i=0; i<objects.length; i++){
                    changeTexture(objects[i],"Texture.001","assets/mianliao_blue.jpg");
                  }   
                }
              }, 
                { name: '绿色面料', ecode: 3 ,clickAction: () =>{
                  for(var i=0; i<objects.length; i++){
                    changeTexture(objects[i],"Texture.001","assets/mianliao_green.jpg");
                  }   
                }},] },
            ],
            [
              { key: 'key2', title: '领子', container: [
                { name: '领子', ecode: 0, clickAction: () => { changeVisiable('pocket_01', false); changeVisiable('pocket_02', true); } },
                { name: '领子', ecode: 1, clickAction: () => { changeVisiable('pocket_01', true); changeVisiable('pocket_02', false); } }
              ] },
            ],
            [
              { key: 'key3', title: '口袋', container: [
                { name: '竖袋', color: 'red', ecode: 0 ,clickAction: () => { changeVisiable('pocket_01', false); changeVisiable('pocket_02', true); }},
                { name: '斜袋', color: '口袋', ecode: 1 ,clickAction: () => { changeVisiable('pocket_01', true); changeVisiable('pocket_02', false); }}, 
                { name: '无袋', color: 'black', ecode: 2 ,clickAction: () => { 
                  const arr = ["pocket_01","pocket_02"];
                  hideObjects(arr);
                }},
                ]
              }
            ],
          ],
          [
            [
              { key: 'embPositions', title: '刺绣位置', container: embPositions },
              { key: 'embFonts', title: '刺绣字体', container: embFonts },
              { key: 'embColors', title: '刺绣颜色', container: embColors, type: 'color' },
              { key: 'key11', title: '请输入刺绣内容(最多12个字）', type: 'input' },
            ],
            [
              { key: 'printings', title: '印花位置', container: printings },
            ]
          ],
        ];
        const selectKeys = {};
        contentArr.forEach((item) => item.forEach((item) => item.forEach((item) => {
          selectKeys[item.key] = item.container && item.container.length > 0 ? item.container[0].ecode : undefined;
        })));
        this.setState({ contentArr, selectKeys });
      } else {
        console.log('wx.miniProgram.pos');
      }
    });
  }
  hideOrshow = () => {
    console.log("====hideOrshow======");
    wx.miniProgram.postMessage({ data: { ffdf: 'foos', name: "dadf", dsfds: 'dfadf' } });
  }
  save = () => {
    console.log("wx.miniProgram.postMessage({ data: 'foos' })");
    // wx.miniProgram.navigateBack();
    wx.miniProgram.postMessage({ data: { ffdf: 'foos', name: "dadf", dsfds: 'dfadf' } });
  }
}

export default App;