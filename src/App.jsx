import { useState } from 'react'
// import './App.css'
import NewsList from './pages/news'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <NewsList />
    </div>
  )
}

export default App
