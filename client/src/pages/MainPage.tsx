import { Layout } from '../components/Layout/Layout'
import { TodosList } from '../components/TodosList/TodosList'

export const MainPage = (): JSX.Element => {
  return (
    <Layout>
      <TodosList />
    </Layout>
  )
}
