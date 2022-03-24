import Vue from 'vue'
import {
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Input,
  Row,
  Col,
  Table,
  TableColumn,
  Pagination,
  Message,
  Dialog,
  Form,
  FormItem,
  MessageBox
} from 'element-ui'

Vue.use(FormItem)
Vue.use(Form)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Col)
Vue.use(Row)
Vue.use(Input)
Vue.use(Card)
Vue.use(BreadcrumbItem)
Vue.use(Breadcrumb)
Vue.use(Button)

Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
