
import jsonp from 'common/js/jsonp.js'
import { commonParams, option } from './config'
import axios from 'axios'
export function getLyric(mid){
    let url = "/api/getLyric";
    const data = Object.assign({}, commonParams, {
        songmid: mid,
        pcachetime: new Date(),
        platform: 'yqq',
        hostUin: 0,
        needNewCode: 0,
        format: 'json',
        g_tk: ''
    })

    return axios.get(url,{
        params: data
    }).then((resp)=>{

       return Promise.resolve(resp.data)
    })
}