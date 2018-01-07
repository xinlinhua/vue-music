<template>
    <transition name="slide">
         <div class="singer-detail">
           <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list> 
         </div>
    </transition>
   
</template>

<script>
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getMusicList} from 'api/rank'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
export default {
    data(){
        return {
            songs: []
        }
    },
    computed:{
        title(){
            return this.topList.topTitle
        },
        bgImage(){
            if(this.songs.length > 0){
                return this.songs[0].image
            }
            return ''
            
        },
        ...mapGetters([
            'topList'
        ])
    },
    components:{
        MusicList
    },
    created(){
        this._getMusicList()
    },
    methods:{
        _getMusicList(){
            if(!this.topList.id){
                this.$router.push('/rank')
                return
            }
            getMusicList(this.topList.id).then((res)=>{
                if(res.code === ERR_OK){
                    
                    this.songs = this._normalizeSong(res.songlist)
                }
            })
        },
         _normalizeSong(list){
            let ret = [];
            list.forEach(item => {
            let musicData = item.data;
            if(musicData.songid && musicData.albumid){
                ret.push(createSong(musicData))
            }
            });
            return ret;
        }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>