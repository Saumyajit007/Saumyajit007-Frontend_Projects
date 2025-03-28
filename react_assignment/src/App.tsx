import { useState } from 'react'
import './App.css'


interface boxInfo {
  element: number,
  color: string
}

function App() {

  const [myArr, setMyArr] = useState<boxInfo[]>(new Array(9).fill(0).map((e, i) => ({ element: e + i + 1, color: "transparent" })))

  const [trackClick, setTrackClick] = useState<number[]>([])

  const handleClick = (e: boxInfo): void => {
    if (myArr.includes(e) && e.color === "transparent") {
      setTrackClick([...trackClick, e.element])
      if (e.element < 9) {
        makeColourChange(e, " rgb(72, 245, 72)")
      } else {
        makeOrange("rgb(192, 127, 7)")
      }
    }
  }

  const makeColourChange = (boxObj: boxInfo, color: string) => {
    setMyArr((prev) => {
      prev[boxObj.element - 1] = {
        element: boxObj.element,
        color: color
      }
      return prev
    })
  }

  const makeOrange = (color: string) => {
    [...trackClick,9].forEach((ele, i) => {
      setTimeout(() => {
        setMyArr((prev)=>{
          const exarr = [...prev]
          exarr[ele-1]={
            element:ele,
            color:color
          }
          return exarr
        })
      }, i * 500);
      console.log(myArr)
    })
    console.log(trackClick)
  }
  return (
    <>
    <div style={{fontSize:"60px"}}>3x3 martrix</div>
      <div className='matrix-container'>
        {
          myArr.map((e) => <div key={e.element} className='matrix' style={{ backgroundColor: e.color }} onClick={() => handleClick(e)}></div>)
        }
      </div>
    </>
  )
}

export default App

