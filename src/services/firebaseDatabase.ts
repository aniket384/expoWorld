// Using Firebase Realtime Database instead of Firestore
import { db } from '../firebase/config';
import { ref, get, set, update, remove, onValue, query, orderByChild, equalTo, limitToFirst } from 'firebase/database';

// Type definitions for common data structures
export interface DatabaseItem {
  id: string;
  [key: string]: any;
}

export interface DatabaseResponse<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

/**
 * Fetch all data from a specific path in Realtime Database
 * @param path - The path to fetch from
 * @returns Promise with the fetched data
 */
export const fetchAllData = async <T extends DatabaseItem>(path: string): Promise<T[]> => {
  try {
    const dbRef = ref(db, path);
    const snapshot = await get(dbRef);
    const data: T[] = [];
    if (snapshot.exists()) {
      snapshot.forEach(childSnapshot => {
        data.push({
          id: childSnapshot.key as string,
          ...childSnapshot.val()
        } as T);
      });
    }
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

/**
 * Fetch a single item by ID from Realtime Database
 * @param path - The path
 * @param id - The item ID
 * @returns Promise with the single item
 */
export const fetchById = async <T extends DatabaseItem>(path: string, id: string): Promise<T | null> => {
  try {
    const itemRef = ref(db, `${path}/${id}`);
    const snapshot = await get(itemRef);
    if (snapshot.exists()) {
      return {
        id: snapshot.key as string,
        ...snapshot.val()
      } as T;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching item by ID:', error);
    throw error;
  }
};

/**
 * Listen to real-time updates from a specific path
 * @param path - The path to listen to
 * @param callback - Function to call when data changes
 * @returns Unsubscribe function
 */
export const listenToData = <T extends DatabaseItem>(
  path: string,
  callback: (data: T[]) => void
) => {
  const dbRef = ref(db, path);
  const unsubscribe = onValue(dbRef, (snapshot) => {
    const data: T[] = [];
    snapshot.forEach(childSnapshot => {
      data.push({
        id: childSnapshot.key as string,
        ...childSnapshot.val()
      } as T);
    });
    callback(data);
  });
  return () => unsubscribe();
};

/**
 * Add new item to Realtime Database
 * @param path - The path
 * @param data - The data to add
 * @returns Promise with the new item ID
 */
export const addData = async (path: string, data: any): Promise<string> => {
  try {
    const dbRef = ref(db, path);
    const newRef = ref(db, `${path}/${Date.now()}`);
    await set(newRef, data);
    return newRef.key as string;
  } catch (error) {
    console.error('Error adding item:', error);
    throw error;
  }
};

/**
 * Update existing item in Realtime Database
 * @param path - The path
 * @param id - The item ID to update
 * @param data - The data to update
 * @returns Promise
 */
export const updateData = async (path: string, id: string, data: any): Promise<void> => {
  try {
    const itemRef = ref(db, `${path}/${id}`);
    await update(itemRef, data);
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
};

/**
 * Delete item from Realtime Database
 * @param path - The path
 * @param id - The item ID to delete
 * @returns Promise
 */
export const deleteData = async (path: string, id: string): Promise<void> => {
  try {
    const itemRef = ref(db, `${path}/${id}`);
    await remove(itemRef);
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};

/**
 * Query data with filters from Realtime Database
 * @param path - The path
 * @param filters - Query filters
 * @returns Promise with filtered data
 */
export const queryData = async <T extends DatabaseItem>(
  path: string,
  filters: {
    where?: [string, any];
    orderBy?: string;
    limit?: number;
  }
): Promise<T[]> => {
  try {
    let dbQuery: any = ref(db, path);

    if (filters.orderBy) {
      dbQuery = query(dbQuery, orderByChild(filters.orderBy));
    }

    if (filters.where) {
      const [field, value] = filters.where;
      dbQuery = query(dbQuery, orderByChild(field), equalTo(value));
    }

    if (filters.limit) {
      dbQuery = query(dbQuery, limitToFirst(filters.limit));
    }

    const snapshot = await get(dbQuery);
    const data: T[] = [];
    if (snapshot.exists()) {
      snapshot.forEach(childSnapshot => {
        data.push({
          id: childSnapshot.key as string,
          ...childSnapshot.val()
        } as T);
      });
    }
    return data;
  } catch (error) {
    console.error('Error querying data:', error);
    throw error;
  }
};

export default {
  fetchAllData,
  fetchById,
  listenToData,
  addData,
  updateData,
  deleteData,
  queryData,
};
