import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = 'http://32.201.75.232:5000';

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const res = await axios.get(`${API_BASE_URL}/api/items`);
      setItems(res.data);
    } catch (err) {
      console.error('Fetch error:', err.message);
      setError('Unable to connect to backend. Please check the API server.');
    } finally {
      setLoading(false);
    }
  }, []);

  const addItem = async () => {
    if (!name.trim()) {
      setError('Please enter an item name.');
      return;
    }

    try {
      setError('');

      await axios.post(`${API_BASE_URL}/api/items`, {
        name: name.trim(),
      });

      setName('');
      await fetchItems();
    } catch (err) {
      console.error('Add item error:', err.message);
      setError('Failed to add item. Please check your backend connection.');
    }
  };

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Three-Tier App</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter item"
      />

      <button onClick={addItem}>Add</button>

      {loading && <p>Loading items...</p>}

      {error && (
        <p style={{ color: 'red' }}>
          {error}
        </p>
      )}

      <ul>
        {items.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
