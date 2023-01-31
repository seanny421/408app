import useStore from "../../../global/state"

interface Props {
  file: File 
}

export default function SelectionListItem(props: Props){
  const store = useStore()

  function handleDrag(){
    console.log(props.file.name)
    store.setCurrentFile(props.file)
    store.setLastMouseEvent("mousedown")
  }

  return(
  <div onMouseDown={handleDrag} style={{borderBottom: '2px solid red', cursor: 'pointer', userSelect: 'none'}}>
    <div id="thumbnail">
    </div>
    <div>
      {props.file.name}
    </div>
  </div>
  )
}
