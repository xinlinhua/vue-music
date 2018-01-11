import jsonp from 'common/js/jsonp.js'
import {commonParams, option } from './config'
import axios from 'axios'
export function getHotKey() {

    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

    const data = Object.assign({}, commonParams, {
        needNewCode: 1,
        platform: 'j5'
    })
    return jsonp(url, data, option);
}


export function search(query, page, zhida, perpage) {

    const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
    
    const data = Object.assign({}, commonParams, {
        platform: 'h5',
        needNewCode: 1,
        w: query,
        p: page,
        zhidaqu: 1,
        catZhida: zhida ? 1 : 0,
        t: '0',
        flag: 1,
        ie: 'utf-8',
        sem:1,
        aggr:'0',
        perpage, 
        n: perpage,
        uid:'0',
        remoteplace: 'txt.mqq.all'
        
    })
    return jsonp(url, data, option);
} 