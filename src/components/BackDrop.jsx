// import React from 'react'

function BackDrop({ data }) {
  return (
    <div 
        className={`z-20 transition-all duration-200 opacity-50 w-screen h-screen bg-slate-300 fixed left-0 ${data ? "top-16" : "top-0"}`}>
        BackDrop
    </div>
  )
}

export default BackDrop
