import React from 'react'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { Provider } from 'mobx-react'
import Center from '../../components/center'
import LeftPanel from '../../components/left-panel'
import RightPanel from '../../components/right-panel'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Store } from '../../store'
import Layout from '../../components/layout'

const rootStore = new Store()

class App extends React.Component<any, {user: string}> {
  componentDidMount() {
    rootStore.loadElements()
  }

  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <Provider rootStore={rootStore}>
          <Layout
            header={
              <Header />
            }
            left={
              <LeftPanel />
            }
            right={
              <RightPanel />
            }
            center={
              <Center />
            }
            footer={
              <Footer />
            }
          >
          </Layout>
        </Provider>
      </DndProvider>
    )
  }
}

export default App
