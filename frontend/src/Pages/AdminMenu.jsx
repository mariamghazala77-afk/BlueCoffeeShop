import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Style/AdminMenu.css";

function AdminMenu() {
  // ===============================
  // NAVIGATION
  // ===============================
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin/login");
  };

  // ===============================
  // STATE
  // ===============================
  const [menu, setMenu] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Hot Beverages");

  // 👇 BOTH OPTIONS
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  // ===============================
  // FETCH MENU
  // ===============================
  const fetchMenu = async () => {
    try {
      const res = await axios.get("/api/menu/admin/all");
      setMenu(res.data);
    } catch (err) {
      console.error("FETCH MENU ERROR:", err);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // ===============================
  // ADD / UPDATE ITEM
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);

    // PRIORITY: upload file > URL
    if (imageFile) {
      formData.append("image", imageFile);
    } else if (imageUrl) {
      formData.append("image_url", imageUrl);
    }

    try {
      if (editingId) {
        await axios.put(`/api/menu/${editingId}`, formData);
      } else {
        await axios.post("/api/menu", formData);
      }

      resetForm();
      fetchMenu();
    } catch (err) {
      console.error("SAVE MENU ERROR:", err);
      alert("Failed to save menu item");
    }
  };

  // ===============================
  // EDIT ITEM
  // ===============================
  const handleEdit = (item) => {
    setEditingId(item.id);
    setName(item.name);
    setPrice(item.price);
    setCategory(item.category);
    setImageFile(null);
    setImageUrl(item.image_url || "");
  };

  // ===============================
  // DELETE ITEM
  // ===============================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    try {
      await axios.delete(`/api/menu/${id}`);
      fetchMenu();
    } catch (err) {
      console.error("DELETE ERROR:", err);
      alert("Failed to delete item");
    }
  };

  // ===============================
  // RESET FORM
  // ===============================
  const resetForm = () => {
    setEditingId(null);
    setName("");
    setPrice("");
    setCategory("Hot Beverages");
    setImageFile(null);
    setImageUrl("");
  };

  return (
    <div className="admin-page">
      <div className="admin-card">
        {/* HEADER */}
        <div className="admin-header">
          <h1 className="admin-title">Admin Menu Management</h1>

          <div className="admin-header-buttons">
            <button
              className="admin-orders-btn"
              onClick={() => navigate("/admin/orders")}
            >
              View Orders
            </button>

            <button
              className="admin-logout-btn"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="admin-form">
          <input
            className="admin-input"
            placeholder="Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="admin-input"
            type="number"
            step="0.01"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <select
            className="admin-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Hot Beverages</option>
            <option>Desserts</option>
            <option>Sandwiches</option>
            <option>Croissant</option>
          </select>

          {/* OPTION 1 — UPLOAD IMAGE */}
          <input
            className="admin-input"
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />

          {/* OPTION 2 — IMAGE URL */}
          <input
            className="admin-input"
            type="text"
            placeholder="Or paste Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />

          <button type="submit" className="admin-btn">
            {editingId ? "Update Item" : "Add Item"}
          </button>
        </form>

        {/* MENU LIST */}
        <div className="admin-list">
          {menu.map((item) => (
            <div key={item.id} className="admin-row">
              <span>
                {item.name} — ${item.price}
              </span>

              <div>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default AdminMenu;

