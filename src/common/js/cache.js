
import storage from 'good-storage'
const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15

function insertSearch(arr,val, compare, maxLen){
    
    const index = arr.findIndex(compare)
    if(index === 0){
        return
    }
    if(index > 0){
        arr.splice(index,1)

    }
    arr.unshift(val)
    if(maxLen && arr.length > maxLen){
        arr.pop()
    }
}
function delectFromArray(arr,compare){
    const index = arr.findIndex(compare)
    if(index > -1 ){
        arr.splice(index,1)
    }
}
export function saveSearch(query){
    
    let searchs = storage.get(SEARCH_KEY, [])
    insertSearch(searchs,query, function(item){
        return item === query
    }, SEARCH_MAX_LENGTH)
    storage.set(SEARCH_KEY, searchs)
    console.log(searchs)
    return searchs
}

export function loadSearch(query){
    return storage.get(SEARCH_KEY, [])

}

export function delectSearch(query){
    let searches = storage.get(SEARCH_KEY, [])
    delectFromArray(searches,function(item){
        return item === query
    })
    storage.set(SEARCH_KEY, searches)
    return searches
}   
export function delectAllSearch(query){
    storage.remove(SEARCH_KEY)
   return []
}   