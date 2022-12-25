import Vue from "vue"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHouse, faPlus, faMagnifyingGlass, faCircleNotch, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHouse, faPlus, faMagnifyingGlass, faCircleNotch, faPen)
Vue.component('fai', FontAwesomeIcon)