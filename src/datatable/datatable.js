import './style.css'
import { createApp } from 'vue'
import DataTableComponent from './components/DataTableComponent.vue'

const app = createApp({
  components: { DataTableComponent },
  name: 'Datatable'
})

app.mount('#data-table')
