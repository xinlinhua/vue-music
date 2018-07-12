<template>
    <transition name="slide">
         <div class="singer-detail">
           <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list> 
         </div>
    </transition>
   
</template>
<script>
import {mapGetters} from 'vuex'
import {ERR_OK} from 'api/config'
import {getSingerDetail, getSingerVkey} from 'api/singer'
import {createSong} from 'common/js/song'
import MusicList from '../music-list/music-list'
export default {
    data(){
        return {
          songs:[]
        }
    },
    components:{
      MusicList
    },
    computed:{
     ...mapGetters([
       'singer'
     ]),
     title(){
       return this.singer.name;
     },
     bgImage(){
       return this.singer.avatar;
     }
    },
    created(){
      
      this.getSingerDetail()
    },
    methods:{
     getSingerDetail(){
        if(!this.singer.id){
            this.$router.push('/singer')
            return;
        }
        
        getSingerDetail(this.singer.id).then(res=>{
          console.log(res);
          if(res.code === ERR_OK){
              this.songs = this._normalizeSong(res.data.list);
             
          }
            
        })
     },
     _normalizeSong(list){
        let ret = [];
        list.forEach(item => {
          let {musicData} = item;
          if(musicData.songid && musicData.songmid){
            console.log(getSingerDetail);
              getSingerVkey(musicData.songmid).then((res) => {
                
                if(res.code === ERR_OK){
                  let songVkey = res.data.items[0].vkey;
                  const newSong = createSong(musicData, songVkey);
                  ret.push(newSong)
                }
              })
          }
        });
        return ret;
     }
   }
  
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .singer-detail
    position:fixed;
  
    top: 0;
    left: 0;
    right:0;
    bottom: 0;
    background: $color-background 
  .slide-enter-active, .slide-leave-active 
    transition: all .3s
    
 .slide-enter, .slide-leave-to 
    transform: translate3d(100%,0,0)
    
</style>
