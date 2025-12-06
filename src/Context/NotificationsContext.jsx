import React, { createContext, useContext, useState } from 'react'

const NotificationsContext = createContext(null)

const initialNotifications = [
  {
    id: 1,
    type: 'Joined New Ideas',
    title: 'New Registration: Finibus Bonorum et Malorum',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
    user: 'Allen Deu',
    date: '24 Nov 2018 at 9:30 AM',
    icon: '📋'
  },
  {
    id: 2,
    type: 'Message',
    title: 'Darren Smith sent new message',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
    user: 'Darren',
    date: '24 Nov 2018 at 9:30 AM',
    icon: '💬'
  },
  {
    id: 3,
    type: 'Comment',
    title: 'Arin Gansihram Commented on post',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
    user: 'Arin Gansihram',
    date: '24 Nov 2018 at 9:30 AM',
    icon: '💭'
  },
  {
    id: 4,
    type: 'Connect',
    title: 'Juliet Den Connect Allen Depk',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
    user: 'Juliet Den',
    date: '24 Nov 2018 at 9:30 AM',
    icon: '🔗'
  },
  {
    id: 5,
    type: 'Connect',
    title: 'Juliet Den Connect Allen Depk',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
    user: 'Juliet Den',
    date: '24 Nov 2018 at 9:30 AM',
    icon: '🔗'
  },
  {
    id: 6,
    type: 'Message',
    title: 'Darren Smith sent new message',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
    user: 'Juliet Den',
    date: '24 Nov 2018 at 9:30 AM',
    icon: '💬'
  }
]

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(initialNotifications)

  return (
    <NotificationsContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationsContext.Provider>
  )
}

export const useNotifications = () => {
  const ctx = useContext(NotificationsContext)
  if (!ctx) throw new Error('useNotifications must be used within NotificationsProvider')
  return ctx
}

export default NotificationsContext
