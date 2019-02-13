const Mock = require('mockjs');

module.exports = {

  [`POST /api/activity/queryAll`](req, res) {

    res.status(200).json({
      errorMessage: '',
      returnCode: '0',
      returnMessage: 'success',
      returnValue: {
        content: [
          {
            name: '春节活动1',
            id: 1,
            title: '迎春接福发发发嗷嗷的',
            createTime: 1550021362531,
            creator: 'dkplus',
            updateTime: 1550041362531,
            updatePerson: 'bingli',
            status: 0,
            beginTime: 1550021362531,
            endTime: 1550041362531
          },
          {
            name: '春节活动2',
            id: 2,
            title: '迎春接福发发发请问',
            createTime: 1550021362531,
            creator: 'dkplus',
            updateTime: 1550041362531,
            updatePerson: 'bingli',
            status: 0,
            beginTime: 1550021362531,
            endTime: 1550041362531
          },
          {
            name: '春节活动3',
            id: 3,
            title: '迎春接福发发发放到',
            createTime: 1550021362531,
            creator: 'dkplus',
            updateTime: 1550041362531,
            updatePerson: 'bingli',
            status: 0,
            beginTime: 1550021362531,
            endTime: 1550041362531
          },
        ]
      }
    })
  },

  [`POST /api/activity/query`](req, res) {

    res.status(200).json({
      errorMessage: '',
      returnCode: '0',
      returnMessage: 'success',
      returnValue: {
        name: '春节活动',
        id: 1,
        title: '迎春接福发发发',
        createTime: 1550021362531,
        creator: 'dkplus',
        updateTime: 1550041362531,
        updatePerson: 'bingli',
        status: 0,
        beginTime: 1550021362531,
        endTime: 1550041362531
      }
    })
  }
}