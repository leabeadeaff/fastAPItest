import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/items";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get(API_URL);
    setItems(response.data);
  };

  const addItem = async () => {
    if (newItem.trim() === "") return;
    await axios.post(API_URL, { name: newItem });
    setNewItem("");
    fetchItems(); 
  };

  const deleteItem = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchItems(); 
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>React + FastAPI</h2>

      <input 
        type="text" 
        value={newItem} 
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Введите новый элемент"
      />
      <button onClick={addItem}>Добавить</button>

      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => deleteItem(item.id)}>❌ Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;