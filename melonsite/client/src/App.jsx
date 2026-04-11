import { useState } from 'react'
import './App.css'

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <>
     <h1>mel_onsite /// Home</h1>
        <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
          </>
  )
}

export default App
