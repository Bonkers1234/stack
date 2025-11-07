
const Notification = ({ info }) => {

  if(!info) return null

  return (
    <div className={info.type}>
      {info.text}
    </div>
  )
}

export default Notification