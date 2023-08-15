import React from 'react'
// import "./ListItem.css"
import dayjs from 'dayjs'
const ListItem = ({date}) => {
  return (
    <div className="flexColCenter item">
       {
           dayjs(date).format("DD/MM/YYYY")
       }
    </div>
    
  )
}

export default ListItem
