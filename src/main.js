import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './styles/index.scss'
import { has } from './directives/has'

const app = createApp(App)
const pinia = createPinia()

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.directive('has',{
  mounted(el) {
      if(router.currentRoute.value.meta?.btnPermissions) {
          const btnPermissionsArr = router.currentRoute.value.meta.btnPermissions;
          if(!has(btnPermissionsArr)) {
              if(el.parentNode) {
                  el.parentNode.removeChild(el)
              }
          }
      }
  }
})
app.use(ElementPlus)
app.use(pinia)
app.use(router)
app.mount('#app') 