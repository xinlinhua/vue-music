import jsonp from 'common/js/jsonp.js'
import { commonParams, option } from './config'
import axios from 'axios'
export function getRecommend() {

    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

    const data = Object.assign({}, commonParams, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    })
    return jsonp(url, data, option);
}


export function getDiscList(){
    let url = "/api/getDiscList";
    const data = Object.assign({}, commonParams, {
        platform: 'yqq',
        hostUin: 0,
        sin: 0,
        ein: 29,
        sortId: 5,
        needNewCode: 0,
        categoryId: 10000000,
        rnd: Math.random(),
        format: 'json'
    })

    return axios.get(url,{
        params: data
    }).then((resp)=>{
        console.log(resp)
       return Promise.resolve(resp.data)
    })
}

export function getSongList(disstid){
    let url = "/api/getSongList";
    const data = Object.assign({}, commonParams, {
        disstid,
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        platform: 'yqq',
        hostUin: 0,
        needNewCode: 1,
        loginUin:0,
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice:0
        
    })

    return axios.get(url,{
        params: data
    }).then((resp)=>{
       return Promise.resolve(resp.data)
    })
}
/* export function getSongList(disstid){
    const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

    const data = Object.assign({}, commonParams, {
        disstid,
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        platform: 'yqq',
        hostUin: 0,
        needNewCode: 1,
    })
    return jsonp(url, data, option);
} */