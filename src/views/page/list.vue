<template>
  <GPage>
    <Button class="mb-5" type="primary" ghost @click="turnPage">
      跳转目录路由：会自动重定向到目录下的第一个子路由
    </Button>
    <br />
    <Button class="mb-5" type="primary" ghost @click="turnNonePage">
      跳转不存在路由: 会自动重定向到404页面
    </Button>
    <br />
    <Button class="mb-5" type="primary" ghost @click="turnHiddenPage">
      跳转隐藏路由: 可以正常访问，但是不会在菜单中显示
    </Button>
    <br />
    <Button class="mb-5" type="primary" ghost @click="turnParamsPage">
      路由参数: 形如 list_id_type.vue 的页面，会解析成路由参数 /:id/:type, 在页面中可以通过
      $route.params 访问
    </Button>
  </GPage>
</template>

<script setup lang="ts">
import { Button } from 'ant-design-vue'
import Router from '@/router'
import GPage from '@/components/GPage/GPage.vue'

const turnPage = () => {
  Router.push('/page/subPage')
}

const turnNonePage = () => {
  Router.push('/page/subPage/none')
}

const turnHiddenPage = () => {
  Router.push('/page/subPage/list/23/detail')
}

const turnParamsPage = () => {
  Router.push('/page/subPage/list/23/edit')
}
</script>

<script lang="ts">
export const btnPermission = {
  add: 101,
}
</script>
