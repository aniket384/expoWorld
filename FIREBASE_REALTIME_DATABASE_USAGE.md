# Firebase Realtime Database Usage Guide

This guide will help you fetch data from Firebase Realtime Database in your React Native Expo project.

## Setup Complete ✅

The following has been configured:
- ✅ `@react-native-firebase/database` package installed
- ✅ Database service file created at `src/services/firebaseDatabase.ts`
- ✅ Custom React hooks created at `src/hooks/useFirebaseData.ts`
- ✅ Example component created at `src/components/FirebaseExample.tsx`

## Quick Start

### 1. Ensure Firebase Database is Enabled
Go to your Firebase Console → Realtime Database → Create Database (if not already created)

### 2. Set Database Rules (for development)
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
⚠️ **Important**: Change these rules for production!

### 3. Basic Usage Examples

#### Using the Custom Hook (Recommended)
```tsx
import { useFirebaseData } from '../hooks/useFirebaseData';

const MyComponent = () => {
  const { data, loading, error } = useFirebaseData('users', true);
  
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;
  
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Text>{item.name}</Text>}
      keyExtractor={(item) => item.id}
    />
  );
};
```

#### Using the Service Directly
```tsx
import { fetchAllData } from '../services/firebaseDatabase';

const loadData = async () => {
  try {
    const users = await fetchAllData('users');
    console.log(users);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### 4. Available Functions

#### Fetching Data
- `fetchAllData<T>(path)` - Get all items from a path
- `fetchById<T>(path, id)` - Get a single item by ID
- `queryData<T>(path, filters)` - Query with filters

#### Real-time Updates
- `listenToData<T>(path, callback)` - Listen for real-time updates

#### CRUD Operations
- `addData(path, data)` - Add new data
- `updateData(path, id, data)` - Update existing data
- `deleteData(path, id)` - Delete data

### 5. Data Structure Example
Your Firebase Realtime Database should have data like:
```json
{
  "events": {
    "event1": {
      "title": "Tech Conference",
      "description": "Annual tech conference",
      "date": "2024-12-15",
      "location": "Convention Center"
    },
    "event2": {
      "title": "Workshop",
      "description": "React Native workshop",
      "date": "2024-12-20",
      "location": "Online"
    }
  }
}
```

### 6. Testing the Implementation
1. Add some test data to your Firebase Realtime Database
2. Import and use the `FirebaseExample` component in your app
3. You should see the data displayed in a list

### 7. Common Issues & Solutions

#### Issue: "Permission denied"
- **Solution**: Check your Firebase Database rules

#### Issue: "No data found"
- **Solution**: Ensure the path exists and has data

#### Issue: TypeScript errors
- **Solution**: Make sure your data matches the expected interface

### 8. Next Steps
1. Replace the example path with your actual database paths
2. Create custom interfaces for your data types
3. Add error handling and loading states
4. Implement pagination for large datasets
5. Add data validation before saving

## Support
If you encounter any issues, check the Firebase Console for:
- Database rules
- Data structure
- Security settings
