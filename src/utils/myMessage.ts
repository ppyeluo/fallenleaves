// h() 函数用于创建 vnodes
import { h, render } from "vue"
import MyMessageComponent from '@/components/myMessage/index.vue'

// 定义一个 div 容器
const div = document.createElement("div")
// 将定义的容器添加到 DOM 上
document.body.appendChild(div)
// 定义定时器：一定时间后清除
let timer: ReturnType<typeof setTimeout> | null = null

// 显示消息提示组件方法
const myMessage = ({ message, type }: { message: string, type: string }) => {
  // 调用创建虚拟节点方法，第一个参数为要创建的虚拟节点即编写好的 Vue 组件，第二个参数为 props 的参数
  const vnode = h(MyMessageComponent, { message, type })
  // 调用渲染方法：将虚拟节点渲染到 DOM 中
  render(vnode, div);
  // 开启定时器，若原先存在则先进行清除
  timer && clearTimeout(timer)
  timer = setTimeout(() => {
    render(null, div)
  }, 2000)
}
export default myMessage
