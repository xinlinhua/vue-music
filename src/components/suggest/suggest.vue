<template>
    <scroll class="suggest" :data="result" :pullup="pullup" :beforeScroll="beforeScroll" @scrollToEnd="searchMore" @beforeScroll="listScroll" ref="suggest">
        <ul class="suggest-list">
            <li class="suggest-item" v-for="item in result" @click="selectItem(item)">
                <div class="icon">
                    <i :class="getIconCls(item)"></i>
                </div>
                <div class="name">
                    <p class="text" v-html="getDisPlayName(item)"></p>
                </div>
            </li>
        </ul>
        <div class="loading-container" v-show="hasMore"> 
            <loading></loading>
        </div>
        <div class="no-result-wrapper" v-show="!hasMore && !result.length">
            <no-result title="抱歉，没有搜索到相关数据"></no-result>
        </div>
    </scroll>
</template>

<script>
import {search} from 'api/search'
import {ERR_OK} from 'api/config'
import Scroll from 'base/scroll/scroll'
import {createSong} from 'common/js/song'
import NoResult from 'base/no-result/no-result'
import Loading from 'base/loading/loading'
import Singer from 'common/js/singer'
import {mapMutations,mapActions} from 'vuex'
const TYPE_SINGER = true
const perpage = 20
export default {
    data(){
        return {
            page: 1,
            result: [],
            pullup: true,
            hasMore: true,
            beforeScroll: true
        }
    },
    props:{
        query:{
            type: String,
            default: ''
        },
        showSinger:{
            type: Boolean,
            default: true
        }
    },
    components:{
        Scroll,
        Loading,
        NoResult
    },
    methods:{
        search(){
            this.page = 1
            this.hasMore = true
            this.$refs.suggest.scrollTo(0,0)
            search(this.query, this.page, this.showSinger, perpage).then((res)=>{
                if(res.code === ERR_OK){
                    this.result = this._getResult(res.data)
                    this._checkMore(res.data)
                }
            })
        },
        searchMore(){
            if(!this.hasMore){
                return
            }
           
            this.page++
            search(this.query, this.page, this.showSinger, perpage).then((res)=>{
                if(res.code === ERR_OK){
                    this.result = this.result.concat(this._getResult(res.data))
                    this._checkMore(res.data)
                }
            })

        },
        getIconCls(item){
            if(item.type === TYPE_SINGER){
                return 'icon-mine'
            }else{
                return 'icon-music'
            }

        
        },
        getDisPlayName(item){
            if(item.type === TYPE_SINGER){
                return item.singername
            }else{
                return `${item.name}-${item.singer}`
            }
        },
        listScroll(){
            this.$emit('listScroll')
        },
        refresh(){
            this.$refs.suggest.refresh();
        },
        _checkMore(data){
            const song = data.song
            if(!song.list.length || (song.curnum + song.curpage + perpage) > song.totalnum){
                this.hasMore = false
            }
         
        },
        selectItem(item){
           
            if(item.type === TYPE_SINGER){
                const singer = new Singer({
                    id: item.singermid,
                    name: item.singername
                })
                this.$router.push({
                    path: `/search/${singer.id}`
                })
                this.setSinger(singer)
            }else{
                this.insertSong(item)
            }
            this.$emit('select')
              
        },
        _getResult(list){
            let ret = []
          
            if(list.zhida && list.zhida.singerid){
                ret.push({...list.zhida, ...{type: TYPE_SINGER}})
            }
            if(list.song){
                ret = ret.concat(this._normalizeSong(list.song.list))
            }
            return ret 
        },
        _normalizeSong(list){
            let ret = [];
            list.forEach((musicData) => {
            
            if(musicData.songid && musicData.albumid){
                ret.push(createSong(musicData)) 
            }
            });
            return ret;
        },
        ...mapMutations({
            setSinger: 'SET_SINGER'
        }),
        ...mapActions([
            'insertSong'
        ])

    },
    watch:{
        query(){
            this.search()
        }
    }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>