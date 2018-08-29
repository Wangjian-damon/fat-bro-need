import React, { Component } from 'react';
import PageHeaderLayout from '../layouts/PageHeaderLayout';
import { Button, Row, Col, Select, message as msg, Table, Divider, Icon, Input } from 'antd';

const Search = Input.Search;
const Option = Select.Option;

import newRealData from '../../../../newRealData';
import areaList from '../../../../areaList';
import areaSchoolList from '../../../../areaSchoolList';
import schoolList from '../../../../schoolList';
import schoolMajorList from '../../../../schoolMajorList';
import majorInfoList from '../../../../majorInfoList';
import scoreLineList from '../../../../scoreLineList';

const columns = [{
  title: '年份',
  dataIndex: 'year',
  key: 'year',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: '地区',
  dataIndex: 'area',
  key: 'area',
}, {
  title: '学校',
  dataIndex: 'school',
  key: 'school',
}, {
  title: '专业',
  dataIndex: 'major',
  key: 'major',
}, {
  title: '分数线',
  dataIndex: 'score',
  key: 'score',
}, {
  title: '等位分',
  dataIndex: 'scoreLine',
  key: 'scoreLine',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">Action 一 {record.name}</a>
      <Divider type="vertical" />
      <a href="javascript:;">Delete</a>
      <Divider type="vertical" />
      <a href="javascript:;" className="ant-dropdown-link">
        More actions <Icon type="down" />
      </a>
    </span>
  ),
}];

export default class ScoreLineRank extends Component {
    constructor(props){
        super(props);
        this.state = {
            userScore:'',
            satistyScorelineList: []
        };
    }
    queryData = (val) => {
        if(!val) return msg() ;
        let list = [];
        for(let item in scoreLineList){
            if(item >= val){
                list.push(scoreLineList[item]);
            }
        }
        this.setState({
            satistyScorelineList: list
        })
    }
    render() {
        return (
            <PageHeaderLayout title="分数查询">
                <Row gutter={10}>    
                    <Col>
                        <Search
                            placeholder="请输入你的分数"
                            onSearch={this.queryData}
                            style={{ width: 200 }}
                            enterButton
                        />
                    </Col>         
                </Row>
                <Table columns={columns} dataSource={this.state.satistyScorelineList} style={{marginTop:'20px'}} />
            </PageHeaderLayout>
        );
    }
}
