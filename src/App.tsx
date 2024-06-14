import { NanoBlockEditor } from '@/NanoBlockEditor'
import json from './sampleData.json'
import { useState } from 'react'

function App() {
  const namespace = "testEditor"
  const editorState = JSON.stringify(json)
  const placeholder = "テストエディターに入力してください"
  const treeView = true
  const onSave = (error: any, response: any) => {
    if(error) {
      console.log(error)
      return
    }
    console.log(JSON.parse(response.json))
  }
  const [editable, setEditable] = useState(true)
  const updateEditable = () => {
    return editable
  }
  const onChangeEditable = () => {
    setEditable(!editable)
    updateEditable
  }

  const options = {
    namespace,
    placeholder,
    editorState,
    treeView,
    onSave,
    editable,
    updateEditable
  }

  return (
    <div className="app">
      
      <NanoBlockEditor options={options} />
      <button data-nano-save="button">save</button>
      <button onClick={onChangeEditable}>編集</button>
    </div>
  );
}

export default App
