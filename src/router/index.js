import Vue from 'vue'
import Router from 'vue-router'


import loginPage from "@/views/loginPage.vue";
import home from "@/views/Home.vue";
import userListPage from "@/views/sysUser/userListPage.vue";
import editUserInfoPage from "@/views/sysUser/editUserInfoPage.vue";
import addUserPage from "@/views/sysUser/addUserPage.vue";

Vue.use(Router)


export default new Router({
  routes: [
  { path: '/', name: 'loginPage', component: loginPage,hidden:true},
  { path: '/home', name: 'home', component: home,hidden:true,children:[
  { path: '/userList', name: 'userListPage', component:
  userListPage,hidden:true},
  { path: '/editUserInfo', name: 'editUserInfoPage', component:
  editUserInfoPage,hidden:true},
  { path: '/addUser', name: 'addUserPage', component:
  addUserPage,hidden:true},
  ]},
  ]
  })
