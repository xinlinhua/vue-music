import { getLyric } from 'api/song'
import { ERR_OK } from 'api/config'
import { Base64 } from 'js-base64'
export default class Song {
    constructor({ id, mid, singer, name, albumm, duraction, image, url }) {
        this.id = id;
        this.mid = mid;
        this.singer = singer;
        this.name = name;
        this.albumm = albumm;
        this.duraction = duraction;
        this.image = image;
        this.url = url;

    }
    getLyric() {
        if (this.lyric) {
            return Promise.resolve(this.lyric);
        }
        return new Promise((resolve, reject) => {
            getLyric(this.mid).then((res) => {
                if (res.retcode === ERR_OK) {
                    this.lyric = Base64.decode(res.lyric)

                    resolve(this.lyric)
                } else {
                    reject('no lyric')
                }
            })
        })

    }
}

export function createSong(musicData) {
    return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filtersSinger(musicData.singer),
        name: musicData.songname,
        albumm: musicData.albumname,
        duraction: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        // url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?vkey=74EBE850231B709A2E47826D41B6323FDDBBACF62B4C95E80A79DC9E4033CB94CCBFBE1090B448F0123C31FEDDF5CC73FE878382CE6AEA06&guid=7055150409&uin=0&fromtag=66` //`http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
        url: `http://thirdparty.gtimg.com/C100${musicData.songmid}.m4a?fromtag=38`

    })
}

function filtersSinger(singer) {
    if (!singer) {
        return;
    }
    let ret = [];
    singer.forEach(s => {
        ret.push(s.name)
    });

    return ret.join('/')
}