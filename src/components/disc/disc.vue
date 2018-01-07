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
import {getSongList} from 'api/recommend'
import {createSong} from 'common/js/song'
import {ERR_OK} from 'api/config'
export default {
    data(){
        return {
            songs: []
        }
    },
    components:{
        MusicList
    },
    computed:{
        title(){
            return this.disc.dissname
        },
        bgImage(){
            return this.disc.imgurl
        },
        ...mapGetters([
            'disc'
        ])
    },
    created(){
        this._getSongList()
    },
    methods:{
        
        _getSongList(){
            if(!this.disc.dissid){
                this.$router.push('/recommend');
                return;
            }
            getSongList(this.disc.dissid).then((res)=>{
                /* function jsonCallback(data){
                    return data;
                }
                var data = eval(res)*/
                if(res.code === ERR_OK){
                     this.songs = this._normalizeSong(res.cdlist[0].songlist)
                    
                }
            })
        },
        _normalizeSong(list){
            let ret = [];
            list.forEach((musicData) => {
            
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
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
