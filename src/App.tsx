import React from 'react';
import { BingoTicket } from './components/BingoTicket';
import { NumberInput } from './components/NumberInput';
import { TicketInput } from './components/TicketInput';
import { TicketManager } from './components/TicketManager';
import { Header } from './components/Header';
import { PickedNumbersList } from './components/PickedNumbersList';
import { Auth } from './components/Auth';
import { useAuth } from './hooks/useAuth';
import { useTickets } from './hooks/useTickets';
import { usePickedNumbers } from './hooks/usePickedNumbers';

export default function App() {
  const { user, loading: authLoading } = useAuth();
  const { tickets, loading: ticketsLoading, addTicket, deleteTicket } = useTickets(user?.id);
  const { 
    pickedNumbers, 
    loading: numbersLoading, 
    addNumber: handleNumberPicked, 
    deleteNumber: handleNumberDelete 
  } = usePickedNumbers(user?.id);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  if (ticketsLoading || numbersLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Loading your bingo data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Header />
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Add New Ticket</h2>
          <TicketInput onTicketAdd={addTicket} />
        </div>

        <TicketManager 
          tickets={tickets} 
          onDeleteTicket={deleteTicket} 
        />

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Pick Numbers</h2>
          <NumberInput onNumberPicked={handleNumberPicked} />
          <PickedNumbersList 
            numbers={pickedNumbers} 
            onNumberDelete={handleNumberDelete}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Your Tickets</h2>
          {tickets.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No tickets added yet</p>
          ) : (
            tickets.map((ticket, index) => (
              <div key={ticket.id} className="relative">
                <div className="absolute -left-8 top-4 bg-blue-500 text-white px-2 py-1 rounded-md text-sm">
                  #{index + 1}
                </div>
                <BingoTicket
                  ticket={ticket}
                  pickedNumbers={pickedNumbers}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}