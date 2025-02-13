import React, { useState, useEffect } from 'react';
import TicketDisplay from './components/TicketDisplay';
import Form from './components/Form/Form';
import './App.css';

const App = () => {
  const [ticketData, setTicketData] = useState(null);

  // Add effect to monitor ticketData changes
  useEffect(() => {
    console.log('ticketData updated:', ticketData);
  }, [ticketData]);

  const handleFormSubmit = (formData) => {
    console.log('handleFormSubmit received:', formData);
    
    // Validate formData before setting state
    if (formData && typeof formData === 'object') {
      // Log the exact shape of data we're about to set
      const newTicketData = {
        fullName: formData.fullName || '',
        email: formData.email || '',
        avatarUrl: formData.avatarUrl || ''
      };
      
      console.log('About to set ticketData to:', newTicketData);
      setTicketData(newTicketData);
    } else {
      console.log('Invalid formData received:', formData);
    }
  };

  return (
    <div className="app">
      <h1>Conference Ticket Generator</h1>
      <div className="container">
        <Form onSubmit={handleFormSubmit} />
        {ticketData && typeof ticketData === 'object' && (
          <>
            {console.log('About to render TicketDisplay with:', ticketData)}
            <TicketDisplay data={ticketData} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;