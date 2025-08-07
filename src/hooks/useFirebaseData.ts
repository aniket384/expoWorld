import { useState, useEffect } from 'react';
import { fetchAllData, listenToData, DatabaseItem } from '../services/firebaseDatabase';

/**
 * Custom hook to fetch and listen to Firebase Realtime Database data
 * @param path - The database path to fetch from
 * @param listen - Whether to listen for real-time updates (default: false)
 * @returns Object with data, loading state, and error
 */
export const useFirebaseData = <T extends DatabaseItem>(
  path: string,
  listen: boolean = false
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (listen) {
          unsubscribe = listenToData<T>(path, (newData) => {
            setData(newData);
            setLoading(false);
          });
        } else {
          const fetchedData = await fetchAllData<T>(path);
          setData(fetchedData);
          setLoading(false);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    loadData();

    // Cleanup function
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [path, listen]);

  return { data, loading, error };
};

/**
 * Custom hook to fetch a single item by ID
 * @param path - The database path
 * @param id - The item ID
 * @returns Object with item data, loading state, and error
 */
export const useFirebaseItem = <T extends DatabaseItem>(
  path: string,
  id: string | null
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setData(null);
      setLoading(false);
      return;
    }

    const loadItem = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { fetchById } = await import('../services/firebaseDatabase');
        const item = await fetchById<T>(path, id);
        setData(item);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    loadItem();
  }, [path, id]);

  return { data, loading, error };
};
