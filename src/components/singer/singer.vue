<template>
    <div class="singer" ref="singer">
        <list-view :data="singerList" @select="selectSinger" ref="list"> </list-view>
        <router-view></router-view>
    </div>
    
</template>
<script>
    import {getSingerList} from 'api/singer'
    import Singer from 'common/js/singer'
    import ListView from 'base/listview/listview'
    import { mapMutations } from 'vuex'
    import {playListMixin} from 'common/js/mixin'
    const HOT_SINGER_LEN = 10
    const HOT_NAME = '热门'
    export default {
        mixins: [playListMixin],
        data(){
            return {
                singerList: []
            }
        },
        components:{
            ListView
        },
        mounted(){
            this._getSingerList();
        },
        methods:{
            selectSinger(singer){
                console.log(singer)
                this.$router.push({
                    path: `/singer/${singer.id}`
                })
                this.setSinger(singer);
            },
            ...mapMutations({
                setSinger: 'SET_SINGER'
            }),
            handlePlayList(playList){
                const buttom = playList.length > 0 ? '60px': ''
                this.$refs.singer.style.bottom = buttom
                this.$refs.list.refresh()
            },
            _getSingerList(){
                getSingerList().then((res)=>{
                    
                    this.singerList = this._normalizeSinger(res.data.list)
                })
            },
            _normalizeSinger(list){
                let map = {
                    hot:{
                        title: HOT_NAME,
                        items: []
                    }
                }
                list.forEach(function(item,index) {
                    if(index < HOT_SINGER_LEN){
                        map.hot.items.push(new Singer({
                            id: item.Fsinger_mid,
                            name: item.Fsinger_name
                        }))
                        
                    }

                    const key = item.Findex;
                    if(!map[key]){
                        map[key] = {
                            title: key,
                            items: []
                        }
                    }
                    map[key].items.push(new Singer({
                        id: item.Fsinger_mid,
                        name: item.Fsinger_name
                    }))

                });
                let hot = [];
                let ret = [];
                for(let key in map ){
                    let val = map[key];
                    if (val.title.match(/[a-zA-Z]/)) {
                        ret.push(val);
                    }else if(val.title === HOT_NAME){
                        hot.push(val)
                    }
                }
                ret.sort((a,b )=>{
                    return a.title.charCodeAt(0) - b.title.charCodeAt(0)
                })
                
                return hot.concat(ret);
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>

