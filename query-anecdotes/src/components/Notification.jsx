import { useNotification } from '../NotificationContext'

const Notification = () => {
  const notification = useNotification()

  const style = notification
    ? {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 5,
      }
    : null

  return <div style={style}>{notification}</div>
}

export default Notification
