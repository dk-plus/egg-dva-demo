import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Card, Table, Button, Divider, Tag, Popconfirm, Timeline, Popover, Form, Input, Row, Col, Select, DatePicker } from 'antd';
import moment from 'moment';
import { formItemLayout } from '../../components/BaseLayout';
import { ONLINE_STATUS } from '../../utils/enum';

const TimelineItem = Timeline.Item;
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

class Template extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    queryForm: {},
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'template/fetch',
    });

    this.loadData();
  }
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'template/initState',
    });
  }

  // 加载数据
  loadData() {
    const { location, history } = this.props;
    console.log(location, history);
  }

  // 查询
  handleSearch() {}

  // 删除
  handleDelete(id) {
    const { dispatch } = this.props;
    dispatch({
      type: 'template/delete',
      payload: {id},
    });
  }

  // 上下线
  handleUpdateStatus(id, status) {
    const { dispatch } = this.props;
    dispatch({
      type: 'template/updateStatus',
      payload: {id, status},
    });
  }

  // 状态
  renderStatus(status) {
    switch (status) {
      case ONLINE_STATUS.ONLINE:
        return <Tag color="green">已上线</Tag>
      case ONLINE_STATUS.OFFLINE:
        return <Tag color="red">已下线</Tag>
      default:
        break;
    }
  }

  // 时间、作者信息展示
  renderUpdateInfo(time, author) {
    const lastTime = moment(time);
    return <Fragment>
      <div>{author}</div>
      <div>{lastTime.isValid() ? lastTime.format('YYYY-MM-DD HH:mm:ss') : ''}</div>
    </Fragment>    
  }

  // 时间轴
  renderTime(timeArr) {
    return <Fragment>
      <Timeline>
        {
          timeArr.map(time => {
            const lastTime = moment(time);
            const timeStamp = lastTime.isValid() ? lastTime.format('YYYY-MM-DD HH:mm:ss') : ''
            return <TimelineItem>{timeStamp}</TimelineItem>
          })
        }
      </Timeline>
    </Fragment>
  }

  // 操作
  renderOperation() {
    const { location: { pathname } } = this.props;
    return <Fragment>
      <Row type="flex" justify="space-between" style={{marginBottom: '20px'}}>
        <Col>
          <Button type="primary"><Link to={`${pathname}/edit`}>新建</Link></Button>
        </Col>
        <Col>
          <Button type="primary">查询</Button>
          <Divider type="vertical" />
          <Button>重置</Button>
        </Col>
      </Row>
    </Fragment>
  }

  renderForm() {
    const { template: { list }, location: { pathname }, form } = this.props;
    const { queryForm } = this.state;
    const { getFieldDecorator } = form;
    const rowGutter = { xs: 8, sm: 16, md: 16, lg: 24 };
    const colSpan = { xs: 24, sm: 12, md: 8, lg: 8 };
    return <Fragment>
      <Form>
        <Row gutter={rowGutter}>
          <Col {...colSpan}>
            <FormItem label="ID" {...formItemLayout}>
              {getFieldDecorator('id', {
                initialValue: queryForm.f_Id,
              })(
                <Input placeholder="请输入ID" />
              )}
            </FormItem>
          </Col>
          <Col {...colSpan}>
            <FormItem label="活动名称" {...formItemLayout}>
              {getFieldDecorator('name', {
                initialValue: queryForm.f_Name,
              })(
                <Input placeholder="请输入活动名称" />
              )}
              </FormItem>
            </Col>
            <Col {...colSpan}>
              <FormItem label="标题" {...formItemLayout}>
                {getFieldDecorator('title', {
                  initialValue: queryForm.f_Title,
                })(
                  <Input placeholder="请输入标题" />
                )}
              </FormItem>
          </Col>
        </Row>
        <Row gutter={rowGutter}>
          <Col {...colSpan}>
            <FormItem label="状态" {...formItemLayout}>
              {getFieldDecorator('status', {
                initialValue: queryForm.f_Status,
              })(
                <Select placeholder="请选择状态">
                  <Option key={ONLINE_STATUS.ONLINE} value={ONLINE_STATUS.ONLINE}>上线</Option>
                  <Option key={ONLINE_STATUS.OFFLINE} value={ONLINE_STATUS.OFFLINE}>下线</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col {...colSpan}>
            <FormItem label="创建时间" {...formItemLayout}>
              {getFieldDecorator('createTime', {
                initialValue: queryForm.f_CreateTime,
              })(
                <RangePicker />
              )}
            </FormItem>
          </Col>
          <Col {...colSpan}>
            <FormItem label="更新时间" {...formItemLayout}>
              {getFieldDecorator('updateTime', {
                initialValue: queryForm.f_UpdateTime,
              })(
                <RangePicker />
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Fragment>
  }

  render() {
    const { template: { list }, location: { pathname } } = this.props;
    const columns = [{
      title: 'ID',
      dataIndex: 'id',
    }, {
      title: '活动名称',
      dataIndex: 'name',
    }, {
      title: '标题',
      dataIndex: 'title',
      // render: (val, record) => <Popover title="生效时间" content={this.renderTime([record.beginTime, record.endTime])}>{val}</Popover>
    }, {
    //   title: '生效时间',
    //   dataIndex: 'beginTime',
    //   render: (val, record) => this.renderTime([val, record.endTime])
    // }, {
      title: '状态',
      dataIndex: 'status',
      render: (val) => this.renderStatus(val)
    }, {
      title: '创建信息',
      dataIndex: 'createTime',
      align: 'center',
      render: (val, record) => this.renderUpdateInfo(val, record.creator)
    }, {
      title: '更新信息',
      dataIndex: 'updateTime',
      align: 'center',
      render: (val, record) => this.renderUpdateInfo(val, record.updatePerson)
    }, {
      title: '操作',
      align: 'center',
      render: (val, record) => {
        return <Fragment>
          <Button size="small"><Link to={`${pathname}/edit?id=${record.id}`}>编辑</Link></Button>
          <Divider type="vertical" />
          {
            record.status === ONLINE_STATUS.OFFLINE &&
            <Popconfirm title="确认上线?" onConfirm={() => {this.handleUpdateStatus(record.id, ONLINE_STATUS.ONLINE)}}>
              <Button size="small">上线</Button>
            </Popconfirm> ||
            <Popconfirm title="确认下线?" onConfirm={() => {this.handleUpdateStatus(record.id, ONLINE_STATUS.OFFLINE)}}>
              <Button size="small">下线</Button>
            </Popconfirm> 
          }
          <Divider type="vertical" />
          <Popconfirm title="确认删除?删除后无法恢复" onConfirm={() => {this.handleDelete(record.id)}}>
            <Button type="danger" size="small">删除</Button>
          </Popconfirm>
        </Fragment>
      }
    }];
    return (
      <Card bordered={false}>
        {this.renderForm()}
        {this.renderOperation()}
        <Table
          columns={columns}
          dataSource={list}
          rowKey={record => record.id}
        />
      </Card>
    )
  }
}

function mapStateToProps({ template }) {
  return {
    template
  }
}

export default Form.create()(connect(mapStateToProps)(Template));