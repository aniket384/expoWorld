import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from '../firebase/config';
import { ref, push, get, query, orderByChild, equalTo } from 'firebase/database';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);

  const addBooking = async (booking) => {
    try {
      const bookingsRef = ref(db, 'bookings');
      const newBookingRef = push(bookingsRef, booking);
      const bookingId = newBookingRef.key;
      setBookings((prevBookings) => [...prevBookings, { ...booking, id: bookingId }]);
      return bookingId;
    } catch (error) {
      console.error('Error adding booking: ', error);
      throw error;
    }
  };

  const fetchBookings = async (userId) => {
    try {
      const bookingsRef = ref(db, 'bookings');
      const userBookingsQuery = query(bookingsRef, orderByChild('userId'), equalTo(userId));
      const snapshot = await get(userBookingsQuery);
      const userBookings = [];
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          userBookings.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
      }
      setBookings(userBookings);
    } catch (error) {
      console.error('Error fetching bookings: ', error);
      throw error;
    }
  };

  const updateBookingStatus = (bookingId, status) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status } : booking
      )
    );
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, fetchBookings, updateBookingStatus }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
