import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Card, Table, Button, Divider, Tag, Popconfirm, Timeline, Popover, Form, Input, Row, Col, Select, DatePicker, message } from 'antd';
import moment from 'moment';
import { formItemLayout } from '../../components/BaseLayout';
import { ONLINE_STATUS } from '../../utils/enum';
import { stringifyQuery, getSortName } from '../../utils/utils';

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
    const { dispatch, location: { query } } = this.props;

    this.loadData(query);
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'template/initState',
    });
  }

  // 加载数据
  loadData(params) {
    const { dispatch } = this.props;

    const queryForm = {
      ...params,
    }

    this.setState({
      queryForm,
    });

    dispatch({
      type: 'template/fetch',
      payload: { params },
    });
  }

  // url加入查询参数
  pushQueryToUrl(search) {
    const { history } = this.props;
    history.replace({
      search,
    });
  }

  // 查询
  handleSearch = (e) => {
    e && e.preventDefault();

    const { form, location: { query } } = this.props;

    form.validateFields((err, formValue) => {
      if (err) {
        message.warn('表单校验出错！');
        return;
      }

      const params = {
        ...query,
        ...formValue,
      }

      // 处理时间
      if (params.f_CreateTime && params.f_CreateTime.length > 0) {
        params.f_CreateTimeBegin = params.f_CreateTime[0].startOf('day').valueOf();
        params.f_CreateTimeEnd = params.f_CreateTime[1].endOf('day').valueOf();
        delete params.f_CreateTime;
      }
      if (params.f_UpdateTime && params.f_UpdateTime.length > 0) {
        params.f_UpdateTimeBegin = params.f_UpdateTime[0].startOf('day').valueOf();
        params.f_UpdateTimeEnd = params.f_UpdateTime[1].endOf('day').valueOf();
        delete params.f_UpdateTime;
      }

      this.pushQueryToUrl(stringifyQuery(params));

      this.loadData(params);
    });
  }

  // 重置表单
  handleResetForm() {
    const { form } = this.props;
    form.resetFields();

    this.setState({
      queryForm: {},
    });

    this.pushQueryToUrl();

    this.loadData();
  }

  // 删除
  handleDelete(id) {
    const { dispatch, location: { query } } = this.props;
    dispatch({
      type: 'template/delete',
      payload: id,
    }).then(res => {
      if (res && res.returnCode === '0') {
        message.success('删除成功');
        this.loadData(query);
      } else {
        message.error(`删除失败${res.errorMessage}`);
      }
    });
  }

  // 上下线
  handleUpdateStatus(id, status) {
    const { dispatch, location: { query } } = this.props;
    dispatch({
      type: 'template/updateStatus',
      payload: {id, status},
    }).then(res => {
      if (res && res.returnCode === '0') {
        message.success('操作成功');
        this.loadData(query);
      } else {
        message.error(`操作失败${res.errorMessage}`);
      }
    });
  }

  // 表格改变
  handleTableChange = (pagination, filters, sorter) => {
    const { location: { query } } = this.props;
    const { current, pageSize } = pagination;
    const params = {
      ...query,
      pageSize,
      pageNo: current,
      sortName: getSortName(sorter.field, sorter.order),
    };

    this.pushQueryToUrl(stringifyQuery(params));

    this.loadData(params);
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
            const timeStamp = lastTime.isValid() ? lastTime.valueOf() : ''
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
          <Button type="primary" htmlType="submit">查询</Button>
          <Divider type="vertical" />
          <Button onClick={() => { this.handleResetForm() }}>重置</Button>
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
      <Form onSubmit={this.handleSearch}>
        <Row gutter={rowGutter}>
          <Col {...colSpan}>
            <FormItem label="活动ID" {...formItemLayout}>
              {getFieldDecorator('f_Id', {
                initialValue: queryForm.f_Id,
              })(
                <Input placeholder="请输入ID"  />
              )}
            </FormItem>
          </Col>
          <Col {...colSpan}>
            <FormItem label="活动名称" {...formItemLayout}>
              {getFieldDecorator('f_Name', {
                initialValue: queryForm.f_Name,
              })(
                <Input placeholder="请输入活动名称"  />
              )}
              </FormItem>
            </Col>
            <Col {...colSpan}>
              <FormItem label="标题" {...formItemLayout}>
                {getFieldDecorator('f_Title', {
                  initialValue: queryForm.f_Title,
                })(
                  <Input placeholder="请输入标题"  />
                )}
              </FormItem>
          </Col>
        </Row>
        <Row gutter={rowGutter}>
          <Col {...colSpan}>
            <FormItem label="活动状态" {...formItemLayout}>
              {getFieldDecorator('f_Status', {
                initialValue: queryForm.f_Status,
              })(
                <Select placeholder="请选择状态" allowClear>
                  <Option key={ONLINE_STATUS.ONLINE} value={ONLINE_STATUS.ONLINE}>上线</Option>
                  <Option key={ONLINE_STATUS.OFFLINE} value={ONLINE_STATUS.OFFLINE}>下线</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col {...colSpan}>
            <FormItem label="创建时间" {...formItemLayout}>
              {getFieldDecorator('f_CreateTime', {
                initialValue: queryForm.f_CreateTimeBegin && queryForm.f_CreateTimeEnd && [moment(parseInt(queryForm.f_CreateTimeBegin)), moment(parseInt(queryForm.f_CreateTimeEnd))],
              })(
                <RangePicker
                  ranges={{ 
                    '今天': [moment(), moment()], 
                    '本周': [moment().startOf('week'), moment().endOf('week')],
                    '本月': [moment().startOf('month'), moment().endOf('month')],
                  }}
                />
              )}
            </FormItem>
          </Col>
          <Col {...colSpan}>
            <FormItem label="更新时间" {...formItemLayout}>
              {getFieldDecorator('f_UpdateTime', {
                initialValue: queryForm.f_UpdateTimeBegin && queryForm.f_UpdateTimeEnd && [moment(parseInt(queryForm.f_UpdateTimeBegin)), moment(parseInt(queryForm.f_UpdateTimeEnd))],
              })(
                <RangePicker
                  ranges={{ 
                    '今天': [moment(), moment()], 
                    '本周': [moment().startOf('week'), moment().endOf('week')],
                    '本月': [moment().startOf('month'), moment().endOf('month')],
                  }}
                />
              )}
            </FormItem>
          </Col>
        </Row>
        {this.renderOperation()}
      </Form>
    </Fragment>
  }

  render() {
    const { template: { list, total }, location: { pathname, query }, loading } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      current: query.pageNo && parseInt(query.pageNo),
      pageSize: query.pageSize && parseInt(query.pageSize),
      total: total,
      showTotal: () => `共${total}条记录`
    };
    const columns = [{
      title: 'ID',
      dataIndex: 'id',
      sorter: true,
    }, {
      title: '活动名称',
      dataIndex: 'name',
      sorter: true,
    }, {
      title: '标题',
      dataIndex: 'title',
      sorter: true,
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
      dataIndex: 'createAt',
      align: 'center',
      sorter: true,
      render: (val, record) => this.renderUpdateInfo(val, record.creator)
    }, {
      title: '更新信息',
      dataIndex: 'updateAt',
      align: 'center',
      sorter: true,
      render: (val, record) => this.renderUpdateInfo(val, record.updatePerson)
    }, {
      title: '操作',
      align: 'center',
      width: '220',
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
        <Table
          columns={columns}
          dataSource={list}
          rowKey={record => record.id}
          loading={loading}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </Card>
    )
  }
}

function mapStateToProps({ template, loading }) {
  return {
    template,
    loading: loading.effects['template/fetch'],
  }
}

export default Form.create()(connect(mapStateToProps)(Template));