import React, { Component } from 'react';
import PageHeaderLayout from '../layouts/PageHeaderLayout';
import { Button, Row, Col, Select, message as msg, Table, Divider, Icon } from 'antd';

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


export default class FatBro extends Component {
    constructor(props){
        super(props);
        this.state = {
            area:'',
            school:'',
            major: '',
            schoolList: schoolList,
            majorList:[],
            renderData:[]
        };
    }
    handleAreaChange = (val) => {
        let schoolArr = [];
        if(areaSchoolList[val]){
            schoolArr = areaSchoolList[val]
        }
        this.setState({
            schoolList: schoolArr,
            area:val,
            school: schoolArr[0],
            majorList: schoolMajorList[schoolArr[0]],
            major: schoolMajorList[schoolArr[0]][0]
        });
    };
    handleSchoolChange = (val) => {
        this.setState({
            majorList: schoolMajorList[val],
            major : schoolMajorList[val][0],
            school:val,
        });
    }
    handleMajorChange = (val) => {
        this.setState({
            major: val
        });
    }
    queryData = () => {
        let query = majorInfoList[this.state.major] ;
        query = query.filter(major=>{
            return major.school == this.state.school && major.area == this.state.area ;
        })
        query.forEach(e=>{
            e.key = e.id;
        })
        this.setState({
            renderData: query
        })
    }
    render() {
        const areaListRender = areaList.map((e, i) => {
            return (
                <Option key={'area' + i} value={e}>
                    {e}
                </Option>
            );
        });
        const schoolListRender = this.state.schoolList.map((e,i)=>{
            return (
                <Option key={'school'+i} value={e}>
                    {e}
                </Option>
            )
        })
        const majorListRender = this.state.majorList.map((e,i)=>{
            return (
                <Option key={'major'+i} value={e}>
                    {e}
                </Option>
            )
        })
        return (
            <PageHeaderLayout title="分数查询">
                <Row gutter={10}>
                    <Col span={2}>
                        <Select
                            placeholder="请选择地区"
                            style={{ width: '100%' }}
                            onChange={this.handleAreaChange}
                        >
                            {areaListRender}
                        </Select>
                    </Col>
                    <Col span={5}>
                        <Select
                            placeholder="请选择学校"
                            style={{ width: '100%' }}
                            onChange={this.handleSchoolChange}
                            value = {this.state.school || '请选择学校'}
                        >
                            {schoolListRender}
                        </Select>
                    </Col>
                    <Col span={6}>
                        <Select
                            placeholder="请选择专业"
                            style={{ width: '100%' }}
                            onChange={this.handleMajorChange}
                            value={this.state.major || '请选择专业'}
                        >
                            {majorListRender}
                        </Select>
                    </Col>
                    <Col span={5} >
                        <Button type="primary" icon="search" style={{ marginRight:10 }} onClick={this.queryData} >查询</Button>
                    </Col>
                </Row>
                <Table columns={columns} dataSource={this.state.renderData} style={{marginTop:'20px'}} />
            </PageHeaderLayout>
        );
    }
}
