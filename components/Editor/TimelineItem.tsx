import {CutVideoObject} from "../../global/types"
import useStore from "../../global/state"
import { useDrag, useDrop } from "react-dnd"

interface Props {
  video: CutVideoObject,
  index: number
}

export default function TimelineItem(props:Props){
  const store = useStore()
  const [{ isOver, canDrop }, drop] = useDrop(
      () => ({
        accept: 'Item',
        drop: (item:{indexFrom: number}) => {
          console.log(item)
          handleSwap(item.indexFrom)

        },
        collect: (monitor) => ({
          isOver: !!monitor.isOver(),
          canDrop: !!monitor.canDrop(),
        }),
      }),
      [],
    )
  const [{ isDragging }, drag] = useDrag(
      () => ({
        type: 'Item',
        item: {indexFrom: props.index},
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
          indexFrom: props.index
        }),
      }),
      [],
    )

  function handleSwap(indexFrom:number){
    store.swapTimelineElements(indexFrom, props.index)
  }

  return (
      <div ref={drag} style={{margin: '0.5rem', opacity: isDragging ? '0.5': '1'}}>
        <div ref={drop}>
          <div className="thumbnail-container" style={{}}>
            <img src={store.timelineImages[props.index]} style={{width: '200px'}}/>
          </div>
          <button onClick={() => store.removeFromTimeline(props.index)}>Remove</button>

        </div>
      </div>

  )
}
