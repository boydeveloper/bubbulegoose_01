import React from 'react';
import { useState, useEffect } from 'react';
import { db } from '../firebase.config';
import { getDocs, collection } from 'firebase/firestore';

function useGetData() {
  const [cards, setCards] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const colref = collection(db, 'cards');
    getDocs(colref)
      .then((snapshot) => {
        let cards = [];
        snapshot.docs.forEach((doc) => {
          cards.push({ ...doc.data(), id: doc.id });
          setCards(cards);
          setLoading(false);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return { cards, loading };
}

export default useGetData;
