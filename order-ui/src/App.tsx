import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const testArg = import.meta.env.TEST_ARG;

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>ビルド検証用アプリ:{import.meta.env.TEST_ARG}</h1>
      <pre>
        1:{import.meta.env.BASE_URL}<br/>
        2:{import.meta.env.DEV}<br/>
        3:{import.meta.env.MODE}<br/>
        4:{import.meta.env.PROD}<br/>
        5:{import.meta.env.SSR}<br/>
      </pre>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
