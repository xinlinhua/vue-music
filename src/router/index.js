import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import Rank from '@/components/rank/rank'
import Recommend from '@/components/recommend/recommend'
import Search from '@/components/search/search'
import Singer from '@/components/Singer/Singer'
import SingerDetail from '@/components/singer-detail/singer-detail'
import Disc from '@/components/disc/disc'
import Toplist from '@/components/top-list/top-list'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: '/recommend'
        },
        {
            path: '/recommend',
            name: 'Recommend',
            component: Recommend,
            children: [{
                path: ':id',
                component: Disc
            }]
        }, {
            path: '/rank',
            name: 'Rank',
            component: Rank,
            children: [{
                path: ':id',
                component: Toplist
            }]
        }, {
            path: '/search',
            name: 'Search',
            component: Search,
            children: [{
                path: ':id',
                component: SingerDetail
            }]
        }, {
            path: '/singer',
            name: 'Singer',
            component: Singer,
            children: [{
                path: ':id',
                component: SingerDetail
            }]

        }
    ]
})