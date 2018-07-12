let express = require('express')

let router = express.Router();
var axios = require('axios')

router.get('/getDiscList', (req, res) => {
    var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';

    axios.get(url, {
        headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
        },
        params: req.query
    }).then((resp) => {
        res.json(resp.data)
    }).catch((err) => {
        console.log(err)
    })
})

router.get('/getLyric', (req, res) => {
    var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

    axios.get(url, {
        headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
        },
        params: req.query
    }).then((resp) => {
        let ret = resp.data
        if (typeof ret === 'string') {
            var reg = /^\w+\(({[^()]+})\)$/
            var matches = ret.match(reg)
            if (matches) {
                ret = JSON.parse(matches[1])
            }
        }
        res.json(ret)
    }).catch((err) => {
        console.log(err)
    })
})
router.get('/getSongList', (req, res) => {
    var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

    axios.get(url, {
        headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
        },
        params: req.query
    }).then((resp) => {
        let ret = resp.data
        console.log(11)
        if (typeof ret === 'string') {
          
            console.log(ret)
            var reg = /^\w+\(({.+})\)$/
            var matches = ret.match(reg)
            if (matches) {
                ret = JSON.parse(matches[1])
            }
        }
        res.json(ret)
    }).catch((err) => {
        console.log(err)
    })
})
router.get('/getMusic', function (req, res) {
    var url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg';
    axios.get(url, { // 此处axios是运行在node.js中，所以此处发的是http请求而不是xhr请求
      headers: { // 修改header骗过浏览器referer和host如下
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com'
      },
      params: req.query
    }).then((response) => {
      res.json(response.data) // 发送response.data给客户端
    }).catch((err) => {
      console.log(err)
    })
  })
module.exports = router;