import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import Rank from '@/components/rank/rank'
import Recommend from '@/components/recommend/recommend'
import Search from '@/components/search/search'
import Singer from '@/components/Singer/Singer'
import SingerDetail from '@/components/singer-detail/singer-detail'
Vue.use(Router)

export default new Router({
  routes: [
     {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    },{
      path: '/rank',
      name: 'Rank',
      component: Rank
    },{
      path: '/search',
      name: 'Search',
      component: Search
    },{
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
