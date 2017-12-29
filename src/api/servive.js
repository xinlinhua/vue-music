let express = require('express')

let router  = express.Router();
var axios = require('axios')

router.get('/getDiscList',(req,res)=>{
     var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
     
     axios.get(url,{
        headers: {
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com'
        },
        params: req.query
     } ).then((resp)=>{
        res.json(resp.data)
     }).catch((err)=>{
        console.log(err)
     })
})

router.get('/getLyric',(req,res)=>{
    var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
    
    axios.get(url,{
       headers: {
       referer: 'https://c.y.qq.com/',
       host: 'c.y.qq.com'
       },
       params: req.query
    } ).then((resp)=>{
        let ret = resp.data
        if (typeof ret === 'string') {
            var reg = /^\w+\(({[^()]+})\)$/
            var matches = ret.match(reg)
            if (matches) {
              ret = JSON.parse(matches[1])
            }
          }
          res.json(ret)
    }).catch((err)=>{
       console.log(err)
    })
})
module.exports = router;