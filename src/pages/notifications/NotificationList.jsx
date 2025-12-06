import React from 'react';
import { useNotifications } from '../../Context/NotificationsContext'

const NotificationsList = () => {
  const { notifications } = useNotifications()

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <header className="text-left mb-6 sm:mb-8 pb-3 sm:pb-4 border-b-2 border-gray-200">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 tracking-wide">NOTIFICATIONS</h1>
      </header>
      
      {/* Notifications List */}
      <div className="space-y-4 sm:space-y-6">
  {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className="flex bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            {/* Icon */}
            <div className="text-lg sm:text-xl mr-3 sm:mr-4 mt-0.5 min-w-5 sm:min-w-6">
              {notification.icon}
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Type and Date */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1 sm:gap-0">
                <strong className="text-xs sm:text-sm font-semibold text-gray-700 break-words">
                  {notification.type}
                </strong>
                <span className="text-xs text-gray-500 font-normal sm:self-start">
                  {notification.date}
                </span>
              </div>
              
              {/* Title */}
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 leading-tight break-words">
                {notification.title}
              </h3>
              
              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-600 mb-3 leading-relaxed break-words">
                {notification.description}
              </p>
              
              {/* User */}
              <div className="pt-2 border-t border-gray-100">
                <strong className="text-xs sm:text-sm font-semibold text-gray-800 break-words">
                  {notification.user}
                </strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsList;