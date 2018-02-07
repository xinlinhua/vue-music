import * as types from './mutations-type'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'
import { saveSearch, delectSearch, delectAllSearch, savePlay, saveFavorite, deleteFavorite} from 'common/js/cache'

function findIndex(list, song) {
    return list.findIndex((item) => {
        return item.id === song.id
    })

}

export const selectPlay = function({ commit, state }, { list, index }) {

    commit(types.SET_SEQUENCE_LIST, list)
    if (state.mode === playMode.random) {
        let randomList = shuffle(list)
        commit(types.SET_PLAY_LIST, randomList)
        index = findIndex(randomList, list[index])
    } else {
        commit(types.SET_PLAY_LIST, list)
    }
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}
export const randomPlay = function({ commit, state }, { list }) {

    commit(types.SET_SEQUENCE_LIST, list)
    commit(types.SET_PLAY_MODE, playMode.random)
    let randomList = shuffle(list)
    commit(types.SET_PLAY_LIST, randomList)
    commit(types.SET_CURRENT_INDEX, 0)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}

export const insertSong = function({ commit, state }, song) {
    let playlist = state.playList.slice()
    let currentIndex = state.currentIndex
    let sequenceList = state.sequenceList.slice()
        //记录当前歌曲
    let currentSong = playlist[currentIndex]
        // 寻找当前歌曲是否存在
    let fpIndex = findIndex(playlist, song)
        //因为插入歌曲，索引加1
    currentIndex++
    // 插入歌曲
    playlist.splice(currentIndex, 0, song)
        //如果插入歌曲的序号大于列表里的序号
    if (fpIndex > -1) {
        if (currentIndex > fpIndex) {
            playlist.splice(fpIndex, 1)
            currentIndex--
        } else {
            playlist.splice(fpIndex + 1, 1)
        }
    }

    let currentSIndex = findIndex(sequenceList, currentSong) + 1
    let fsIndex = findIndex(sequenceList, song)
    sequenceList.splice(currentSIndex, 0, song)

    if (fpIndex > -1) {
        if (currentSIndex > fsIndex) {
            sequenceList.splice(fsIndex, 1)
            currentIndex--
        } else {
            sequenceList.splice(fsIndex + 1, 1)
        }
    }
    commit(types.SET_SEQUENCE_LIST, sequenceList)

    commit(types.SET_PLAY_LIST, playlist)
    commit(types.SET_CURRENT_INDEX, currentIndex)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}


export const saveSearchHistory = function({ commit }, query) {
    commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const delectSearchHistory = function({ commit }, query) {
    commit(types.SET_SEARCH_HISTORY, delectSearch(query))
}

export const clearSearch = function({ commit }) {

    commit(types.SET_SEARCH_HISTORY, delectAllSearch())
}

export const deleteSong = function({ commit, state }, song) {
    let playlist = state.playList.slice()
    let currentIndex = state.currentIndex
    let sequenceList = state.sequenceList.slice()

    // 寻找当前歌曲是否存在
    let pIndex = findIndex(playlist, song)
    let sIndex = findIndex(sequenceList, song)
    playlist.splice(pIndex, 1)
    sequenceList.splice(sIndex, 1)
    if (currentIndex > pIndex || currentIndex === playlist.length) {
        currentIndex--
    }
    commit(types.SET_SEQUENCE_LIST, sequenceList)

    commit(types.SET_PLAY_LIST, playlist)
    commit(types.SET_CURRENT_INDEX, currentIndex)
    let playingState = playlist.length > 0
    commit(types.SET_PLAYING_STATE, playingState)

}

export const delectSongList = function({ commit }) {
    commit(types.SET_SEQUENCE_LIST, [])
    commit(types.SET_PLAY_LIST, [])
    commit(types.SET_CURRENT_INDEX, -1)
    commit(types.SET_PLAYING_STATE, false)
}

export const savePlayHistory = function({ commit }, song) {
    commit(types.SET_PLAY_HISTORY, savePlay(song))
}

export const saveFavoriteList = function({ commit }, song) {
    commit(types.SET_FAVORITE_LIST, saveFavorite(song))
}

export const deleteFavoriteList = function({ commit }, song) {
    commit(types.SET_FAVORITE_LIST, deleteFavorite(song))   
}