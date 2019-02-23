const Mock = require('mockjs');

module.exports = {

  [`GET /activity`](req, res) {

    let num = Math.floor(Math.random()*100);
    let arr = [];
    for (let i = 0; i < num; i++) {
      let obj = {
        name: `圣诞活动${i+1}`,
        id: i+1,
        title: '迎春接福发发发嗷嗷的',
        createTime: new Date().valueOf() - Math.floor(Math.random()*10*60*1000),
        creator: i % 2 === 0 ? 'dkplus' : 'bingli',
        updateTime: new Date().valueOf() + Math.floor(Math.random()*10*60*1000),
        updatePerson: i % 2 !== 0 ? 'dkplus' : 'bingli',
        status: i % 3 === 0 ? 0 : 1,
        beginTime: new Date().valueOf() - Math.floor(Math.random()*10*60*1000),
        endTime: new Date().valueOf() + Math.floor(Math.random()*10*60*1000)
      }
      arr[i] = obj;
    }

    res.status(200).json({
      errorMessage: '',
      returnCode: '0',
      returnMessage: 'success',
      returnValue: {
        content: arr,
        total: num
      }
    })
  },

  [`GET /activity/edit`](req, res) {

    let i = Math.floor(Math.random()*100);
    let obj = {
      name: `圣诞活动${i+1}`,
      id: id,
      title: '迎春接福发发发嗷嗷的',
      createTime: new Date().valueOf() - Math.floor(Math.random()*10*60*1000),
      creator: i % 2 === 0 ? 'dkplus' : 'bingli',
      updateTime: new Date().valueOf() + Math.floor(Math.random()*10*60*1000),
      updatePerson: i % 2 !== 0 ? 'dkplus' : 'bingli',
      status: i % 3 === 0 ? 0 : 1,
      beginTime: new Date().valueOf() - Math.floor(Math.random()*10*60*1000),
      endTime: new Date().valueOf() + Math.floor(Math.random()*10*60*1000)
    }

    res.status(200).json({
      errorMessage: '',
      returnCode: '0',
      returnMessage: 'success',
      returnValue: obj
    })
  },

  [`PUT /activity/*`](req, res) {

    res.status(200).json({
      errorMessage: '',
      returnCode: '0',
      returnMessage: 'success',
      returnValue: true
    })
  },

  [`POST /activity`](req, res) {

    res.status(200).json({
      errorMessage: '',
      returnCode: '0',
      returnMessage: 'success',
      returnValue: true
    })
  },

  [`DELETE /activity/*`](req, res) {

    res.status(200).json({
      errorMessage: '',
      returnCode: '0',
      returnMessage: 'success',
      returnValue: true
    })
  },
}