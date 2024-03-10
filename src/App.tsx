import { NanoBlockEditor } from '@/NanoBlockEditor'
import json from './sampleData.json'

function App() {
  const namespace = "testEditor"
  const data = JSON.stringify(json)
  const placeholder = "テストエディターに入力してください"
  const treeView = true

  const options = {
    namespace,
    data,
    placeholder,
    treeView
  }

  return (
    <div className="app">
      <NanoBlockEditor options={options} />
    </div>
  );
}

export default App
