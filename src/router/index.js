import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const Recommend = () => import('@/components/recommend/recommend')
const Rank = () => import('@/components/rank/rank')
const Search = () => import('@/components/search/search')
const Singer = () => import('@/components/Singer/Singer')
const SingerDetail = () => import('@/components/singer-detail/singer-detail')
const Disc =  () => import('@/components/disc/disc')
const Toplist = () => import('@/components/top-list/top-list')
const UserCenter =  () => import('@/components/user-center/user-center')
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

        },
        {
            path: '/user',
            name: 'User',
            component: UserCenter,
           

        }
    ]
})