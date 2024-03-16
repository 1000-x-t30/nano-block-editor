import { NanoBlockEditor } from '@/NanoBlockEditor'
import json from './sampleData.json'

function App() {
  const namespace = "testEditor"
  const data = JSON.stringify(json)
  const placeholder = "テストエディターに入力してください"
  const treeView = true
  const saveCallback = (error: any, response: any) => {
    if(error) {
      console.log(error)
    }
    console.log(JSON.parse(response.json))
  }

  const options = {
    namespace,
    data,
    placeholder,
    treeView,
    saveCallback
  }

  return (
    <div className="app">
      <NanoBlockEditor options={options} />

      <button data-nbe-save="button">save</button>
    </div>
  );
}

export default App
