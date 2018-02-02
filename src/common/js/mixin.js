import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'
export const playListMixin = {
    computed: {
        ...mapGetters([
            'playList'
        ])
    },
    mounted() {
        this.handlePlayList(this.playList)
    },
    activated() {
        this.handlePlayList(this.playList)
    },
    watch: {
        playList(newVal) {
            this.handlePlayList(newVal)
        }
    },
    methods: {
        handlePlayList() {
            return new Error('component must implement handlePlayList meth0d')
        }
    }
}

export const playerMixin = {
    computed: {
        ...mapGetters([
            'playList',
            'currentSong',
            'mode',
            'sequenceList'
        ]),
        iconMode() {
            return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
        },
    },
    methods: {
        changeMode() {
            const mode = (this.mode + 1) % 3
            this.setPlayMode(mode)
            let list = null
            if (mode === playMode.random) {
                list = shuffle(this.sequenceList)
            } else {
                list = this.sequenceList
            }
            this.resetCurrentIndex(list)
            this.setPlayList(list)
        },
        resetCurrentIndex(list) {

            let index = list.findIndex((item) => {

                return item.id === this.currentSong.id
            })
            this.setCurrentIndex(index)
        },
        ...mapMutations({

            setPlayingState: 'SET_PLAYING_STATE',
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setPlayMode: 'SET_PLAY_MODE',
            setPlayList: 'SET_PLAY_LIST'
        })
    }

}

export const searchMixin = {
    data(){
        return {
            query: ''
        }
    },
    computed:{
        ...mapGetters(['searchHistory'])
    },
    methods:{
        blurInput(){
            this.$refs.searchBox.blur()
        },
        saveSearch(){
            this.saveSearchHistory(this.query)
        },
        ongQueryChange(query){
            this.query = query
        },
        addQuery(query){
            this.$refs.searchBox.setQuery(query)
        },
        ...mapActions([
            'saveSearchHistory', 'delectSearchHistory'
        ])
    }
}