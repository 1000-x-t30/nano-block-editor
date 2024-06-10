import { NanoBlockEditor } from '@/NanoBlockEditor'
// import json from './initEditor.json'
import json from './sampleData.json'

function App() {
  const namespace = "testEditor"
  const initEditor = JSON.stringify(json)
  const placeholder = "テストエディターに入力してください"
  const treeView = true
  const onSave = (error: any, response: any) => {
    if(error) {
      console.log(error)
      return
    }
    console.log(JSON.parse(response.json))
  }
  const editable = true

  const options = {
    namespace,
    initEditor,
    placeholder,
    treeView,
    onSave,
    editable
  }

  return (
    <div className="app">
      <NanoBlockEditor options={options} />
      <button data-nano-save="button">save</button>
    </div>
  );
}

export default App
