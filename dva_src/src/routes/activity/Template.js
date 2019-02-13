import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Card, Table, Button, Divider, Tag, Popconfirm, Timeline, Popover, Form } from 'antd';
import moment from 'moment';
import { ONLINE_STATUS } from '../../utils/enum';

const TimelineItem = Timeline.Item;
const FormItem = Form.Item;

class Template extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'template/fetch',
    });
  }
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'template/initState',
    });
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

  renderForm() {
    const { template: { list }, location: { pathname }, form } = this.props;
    <Form>
      <FormItem></FormItem>
    </Form>
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
      <Card title="h5模板">
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