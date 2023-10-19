import { createApp } from 'vue'
import UserTable from './components/CompanyTable.vue'

const app = createApp({
  components: { UserTable },
  name: 'CompanyList'
})

app.mount('#company-table')
