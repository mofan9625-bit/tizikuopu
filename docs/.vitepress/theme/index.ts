import DefaultTheme from 'vitepress/theme'
import AiToolNav from './components/AiToolNav.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('AiToolNav', AiToolNav)
  }
}
