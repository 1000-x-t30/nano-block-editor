import { NanoLexEditor, HeadingNode } from './container/NanoLexEditor'
import json from './sampleData.json'
import { useState } from 'react'

function App() {
  const namespace = "nl"
  const editorState = JSON.stringify(json)
  const placeholder = "テストエディターに入力してください"
  const treeView = true

  const [nanoState, setNanoState] = useState()
  const onSave = () => {
    console.log(nanoState)
  }

  // editor mode
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
    nodes: [HeadingNode],
    maxNodes: {
      max: 1,
      callback: (isOver: boolean) => console.log(isOver ? 'max over!' : 'safe!')
    },
    actionAfter: setNanoState,
    editable,
    updateEditable
  }

  return (
    <div className="app">
      
      <NanoLexEditor options={options} />
      <button type="button" onClick={onSave}>save</button>
      <button onClick={onChangeEditable}>edit</button>
    </div>
  );
}

export default App
