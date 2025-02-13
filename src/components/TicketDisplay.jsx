import React from 'react';
import './Ticket.css';

const TicketDisplay = (props) => {
  console.log('TicketDisplay received props:', props);
  
  // Check if props exists
  if (!props) {
    console.log('TicketDisplay: props is undefined');
    return null;
  }

  // Check if props.data exists
  if (!props.data) {
    console.log('TicketDisplay: props.data is undefined');
    return null;
  }

  // Log the shape of props.data
  console.log('TicketDisplay props.data shape:', {
    hasFullName: 'fullName' in props.data,
    hasEmail: 'email' in props.data,
    hasAvatarUrl: 'avatarUrl' in props.data,
    fullNameType: typeof props.data.fullName,
    emailType: typeof props.data.email,
    avatarUrlType: typeof props.data.avatarUrl
  });

  // Get values with fallbacks without destructuring
  const fullName = props.data.fullName || '';
  const email = props.data.email || '';
  const avatarUrl = props.data.avatarUrl || 'https://via.placeholder.com/150';
  const ticketNumber = Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="ticket" role="article" aria-label="Conference Ticket">
      <div className="ticket-header">
        <h2>Conference Ticket</h2>
        <span className="ticket-number">#{ticketNumber}</span>
      </div>
      
      <div className="ticket-content">
        <div className="ticket-avatar">
          <img 
            src={avatarUrl} 
            alt={`${fullName}'s avatar`} 
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/150';
              e.target.alt = 'Default avatar';
            }}
          />
        </div>
        
        <div className="ticket-details">
          <div className="ticket-field">
            <label>Attendee Name</label>
            <p>{fullName || 'Not provided'}</p>
          </div>
          
          <div className="ticket-field">
            <label>Email</label>
            <p>{email || 'Not provided'}</p>
          </div>
        </div>
      </div>
      
      <div className="ticket-footer">
        <div className="qr-code">
          <div className="qr-placeholder" aria-hidden="true"></div>
        </div>
        <p className="ticket-info">
          Present this ticket at the conference entrance
        </p>
      </div>
    </div>
  );
};

export default TicketDisplay;