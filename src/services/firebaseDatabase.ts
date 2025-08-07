import database from '@react-native-firebase/database';
import { firebaseConfig } from '../config/firebase';

// Initialize database reference
const databaseRef = database();

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
 * Fetch all data from a specific path in Firebase Realtime Database
 * @param path - The database path to fetch from
 * @returns Promise with the fetched data
 */
export const fetchAllData = async <T extends DatabaseItem>(path: string): Promise<T[]> => {
  try {
    const snapshot = await databaseRef.ref(path).once('value');
    const data = snapshot.val();
    
    if (!data) return [];
    
    // Convert object to array with IDs
    return Object.keys(data).map(key => ({
      id: key,
      ...data[key]
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

/**
 * Fetch a single item by ID from Firebase Realtime Database
 * @param path - The database path
 * @param id - The item ID
 * @returns Promise with the single item
 */
export const fetchById = async <T extends DatabaseItem>(path: string, id: string): Promise<T | null> => {
  try {
    const snapshot = await databaseRef.ref(`${path}/${id}`).once('value');
    const data = snapshot.val();
    
    if (!data) return null;
    
    return {
      id,
      ...data
    };
  } catch (error) {
    console.error('Error fetching item by ID:', error);
    throw error;
  }
};

/**
 * Listen to real-time updates from a specific path
 * @param path - The database path to listen to
 * @param callback - Function to call when data changes
 * @returns Unsubscribe function
 */
export const listenToData = <T extends DatabaseItem>(
  path: string,
  callback: (data: T[]) => void
) => {
  const ref = databaseRef.ref(path);
  
  const listener = ref.on('value', (snapshot) => {
    const data = snapshot.val();
    
    if (!data) {
      callback([]);
      return;
    }
    
    const items = Object.keys(data).map(key => ({
      id: key,
      ...data[key]
    }));
    
    callback(items);
  });
  
  // Return unsubscribe function
  return () => ref.off('value', listener);
};

/**
 * Add new data to Firebase Realtime Database
 * @param path - The database path
 * @param data - The data to add
 * @returns Promise with the new item ID
 */
export const addData = async (path: string, data: any): Promise<string> => {
  try {
    const newRef = databaseRef.ref(path).push();
    await newRef.set(data);
    return newRef.key!;
  } catch (error) {
    console.error('Error adding data:', error);
    throw error;
  }
};

/**
 * Update existing data in Firebase Realtime Database
 * @param path - The database path
 * @param id - The item ID to update
 * @param data - The data to update
 * @returns Promise
 */
export const updateData = async (path: string, id: string, data: any): Promise<void> => {
  try {
    await databaseRef.ref(`${path}/${id}`).update(data);
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

/**
 * Delete data from Firebase Realtime Database
 * @param path - The database path
 * @param id - The item ID to delete
 * @returns Promise
 */
export const deleteData = async (path: string, id: string): Promise<void> => {
  try {
    await databaseRef.ref(`${path}/${id}`).remove();
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};

/**
 * Query data with filters
 * @param path - The database path
 * @param filters - Query filters (orderBy, equalTo, limitToFirst, etc.)
 * @returns Promise with filtered data
 */
export const queryData = async <T extends DatabaseItem>(
  path: string,
  filters: {
    orderBy?: string;
    equalTo?: any;
    limitToFirst?: number;
    limitToLast?: number;
    startAt?: any;
    endAt?: any;
  }
): Promise<T[]> => {
  try {
    let query: any = databaseRef.ref(path);
    
    if (filters.orderBy) {
      query = query.orderByChild(filters.orderBy);
    }
    
    if (filters.equalTo !== undefined) {
      query = query.equalTo(filters.equalTo);
    }
    
    if (filters.limitToFirst) {
      query = query.limitToFirst(filters.limitToFirst);
    }
    
    if (filters.limitToLast) {
      query = query.limitToLast(filters.limitToLast);
    }
    
    if (filters.startAt !== undefined) {
      query = query.startAt(filters.startAt);
    }
    
    if (filters.endAt !== undefined) {
      query = query.endAt(filters.endAt);
    }
    
    const snapshot = await query.once('value');
    const data = snapshot.val();
    
    if (!data) return [];
    
    return Object.keys(data).map(key => ({
      id: key,
      ...data[key]
    }));
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
