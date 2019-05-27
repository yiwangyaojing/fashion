import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const router = new Router({
    routes: [
        // {
        //     path: '/',
        //     name: 'HelloWorld',
        //     component: HelloWorld
        // },
        // {
        //     path: '/',
        //     name: 'home',
        //     component: resolve => require(['@/pages/home'], resolve)
        // },
        {
            path: '/',
            name: 'Ahome',
            component: resolve => require(['@/pages/A_home'], resolve),
            meta:{title:'首页'}
        },
        {
            path: '/Ainvite',
            name: 'Ainvite',
            component: resolve => require(['@/pages/A_invite'], resolve)
        },
        {
            path:'/Aover',
            name:'Aover',
            component: resolve => require(['@/pages/A_over'], resolve)
        },
        {
            path: '/Aconsider',
            name: 'Aconsider',
            component: resolve => require(['@/pages/A_consider'], resolve)
        },
        {
            path: '/end',
            name: 'end',
            component: resolve => require(['@/pages/end'], resolve)
        },
        {
            path: '/budx',
            name: 'budx',
            component: resolve => require(['@/pages/budx'], resolve)
        },
        {
            path: '/register',
            name: 'register',
            component: resolve => require(['@/pages/register'], resolve)
        },
        {
            path: '/chooseGood',
            name: 'chooseGood',
            component: resolve => require(['@/pages/chooseGood'], resolve)
        },
        {
            path: '/chooseSize',
            name: 'chooseSize',
            component: resolve => require(['@/pages/chooseSize'], resolve)
        },{
            path:'/verification',
            name:'verification',
            component: resolve => require(['@/pages/Verification'], resolve)
        },{
            path:'/address',
            name:'address',
            component: resolve => require(['@/pages/Address'], resolve)
        }
        ,{
            path:'/Aend',
            name:'Aend',
            component: resolve => require(['@/pages/A_end'], resolve)
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) {//判断是否有标题
        document.title = to.meta.title
    } else {
        document.title = '选择页'
    }
    let name = to.name;
    if(name == 'address') {
        // 当进入地址选择页的时候,如果用户没有注册,给他返回首页
        if(!(localStorage.getItem('isRegister') - 0)){
            return next({path:'/'})
        }
        if(localStorage.getItem('is_end') - 0 == 1){
            return next({path:'/'})
        }
    }
    console.log('路由检查',to.path)
    next()
  })
  
export default router