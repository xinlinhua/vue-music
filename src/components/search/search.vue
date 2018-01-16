<template>
    <div class="search">
        <div class="search-box-wrapper">
             <search-box ref="searchBox" @query="ongQueryChange"></search-box>
        </div>
        <div class="shortcut-wrapper" v-show="!query" ref="shortcutWrapper">
            <Scroll class="shortcut" ref="shortcut" :data="shortcut">
                <div>
                    <div class="hot-key">
                        <h1 class="title">热门搜索</h1>
                        <ul>
                            <li class="item" v-for="item in hotKey" @click="addQuery(item.k)"><span>{{item.k}}</span></li>
                        </ul>
                    </div>
                    <div class="search-history" v-show="searchHistory.length">
                        <h1 class="title">
                            <span class="text">搜索历史</span>
                            <span class="clear" @click="clearAll">
                                <i class="icon-clear"></i>
                            </span>
                        </h1>
                        <search-list @select="addQuery" @delete="deleteOne" :searches="searchHistory"></search-list>
                    </div>
                </div>
            </Scroll>
        </div>
        <div class="search-result" ref="searchResult" v-show="query">
            <suggest ref="suggest" @select="saveSearch"  :query="query" @listScroll="blurInput"></suggest>
        </div>
        <confirm ref="confirm" text="是否清空所有历史" confirmBtnText="清空" @confirm="clearSearch"></confirm>
        <router-view></router-view>
    </div>
</template>
<script>
import SearchBox from 'base/search=box/search-box'
import {ERR_OK} from 'api/config'
import {getHotKey} from 'api/search'
import Suggest from 'components/suggest/suggest'
import SearchList from 'base/search-list/search-list'
import Confirm from 'base/confirm/confirm'
import Scroll from 'base/scroll/scroll'
import {playListMixin} from 'common/js/mixin'
import {mapActions,mapGetters} from  'vuex'
export default {
    mixins:[playListMixin],
    data(){
        return {
            hotKey:[],
            query: ''
        }
    },
    
    components:{
        SearchBox,
        Suggest,
        SearchList,
        Confirm,
        Scroll
    },
    created(){
        this._getHotKey()
    },
    computed:{
        shortcut(){
            return this.hotKey.concat(this.searchHistory)
        },
        ...mapGetters(['searchHistory'])
    },
    watch:{
        query(newQuery){
            if(!newQuery){
                setTimeout(()=>{
                    this.$refs.shortcut.refresh()
                },20)
                
            }
        }
    },
    methods:{
        handlePlayList(playList){
            const buttom = playList.length > 0 ? '60px': ''
            this.$refs.shortcutWrapper.style.bottom = buttom
            this.$refs.searchResult.style.bottom = buttom
            this.$refs.shortcut.refresh()
            this.$refs.suggest.refresh()
        },
        addQuery(query){
            this.$refs.searchBox.setQuery(query)
        },
        deleteOne(item){
           
            this.delectSearchHistory(item)
        },
        clearAll(){
            this.$refs.confirm.show()
            //this.delectAllSearchHistory()
        },
        ongQueryChange(query){
            this.query = query
        },
        blurInput(){
            this.$refs.searchBox.blur()
        },
        saveSearch(){
            this.saveSearchHistory(this.query)
        },
        _getHotKey(){
            getHotKey().then((res)=>{
                if(res.code === ERR_OK){
                    this.hotKey = res.data.hotkey.slice(0,10)
                }
            })
        },
        ...mapActions([
            'saveSearchHistory', 'delectSearchHistory', 'clearSearch'
        ])

    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>

