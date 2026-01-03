import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/AdminMenu.css";
import api from "../api/axios";

function AdminMenu() {
  const navigate = useNavigate();

  // Reference to file input (used to reset it after submit)
  const fileRef = useRef(null);

  // Backend base URL (used only to display images)
  const API_URL = "http://localhost:5000";

  /* ===============================
     STATE VARIABLES
  ================================ */

  // List of menu items
  const [menu, setMenu] = useState([]);

  // If not null → edit mode
  const [editingId, setEditingId] = useState(null);

  // Form fields
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Hot Beverages");

  // Holds NEW uploaded image file
  const [imageFile, setImageFile] = useState(null);

  // Holds EXISTING image URL (used in edit mode)
  const [currentImage, setCurrentImage] = useState(null);

  /* ===============================
     FETCH MENU FROM BACKEND
  ================================ */
  const fetchMenu = async () => {
    const res = await api.get("/api/menu/admin/all");
    setMenu(res.data);
  };

  // Fetch menu once when component loads
  useEffect(() => {
    fetchMenu();
  }, []);

  /* ===============================
     RESET FORM AFTER SUBMIT
  ================================ */
  const resetForm = () => {
    setEditingId(null);
    setName("");
    setPrice("");
    setCategory("Hot Beverages");
    setImageFile(null);
    setCurrentImage(null);

    // Manually clear file input
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  /* ===============================
     ADD / UPDATE FORM SUBMIT
  ================================ */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !price || !category) {
      alert("Please fill all fields");
      return;
    }

    /* ===============================
       UPDATE MODE
    ================================ */
    if (editingId) {
      const formData = new FormData();

      // Always send text fields
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category);

      // Only send image if a new one was selected
      if (imageFile) {
        formData.append("image", imageFile);
      }

      // Backend will keep old image if none is sent
      await api.put(`/api/menu/${editingId}`, formData);
    }

    /* ===============================
       ADD MODE
    ================================ */
    else {
      // Image is REQUIRED when adding a new item
      if (!imageFile) {
        alert("Please choose an image");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("image", imageFile); // must match upload.single("image")

      await api.post("/api/menu", formData);
    }

    resetForm();
    fetchMenu();
  };

  /* ===============================
     EDIT BUTTON HANDLER
  ================================ */
  const handleEdit = (item) => {
    setEditingId(item.id);
    setName(item.name);
    setPrice(item.price);
    setCategory(item.category);

    // Save current image URL for preview
    setCurrentImage(item.image_url);

    // Clear file input
    setImageFile(null);
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  /* ===============================
     DELETE MENU ITEM
  ================================ */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    await api.delete(`/api/menu/${id}`);
    fetchMenu();
  };

  /* ===============================
     JSX RENDER
  ================================ */
  return (
    <div className="admin-page">
      <div className="admin-card">

        {/* HEADER */}
        <div className="admin-header">
          <h1 className="admin-title">Admin Menu</h1>

          <div className="admin-header-buttons">
            {/* Navigate to Orders page */}
            <button
              className="admin-orders-btn"
              onClick={() => navigate("/admin/orders")}
            >
              View Orders
            </button>

            {/* Logout */}
            <button
              className="admin-logout-btn"
              onClick={() => navigate("/admin/login")}
            >
              Logout
            </button>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="admin-form">

          {/* NAME */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />

          {/* PRICE */}
          <input
            type="number"
            step="0.25"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
          />

          {/* CATEGORY */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Hot Beverages</option>
            <option>Desserts</option>
            <option>Sandwiches</option>
            <option>Croissant</option>
          </select>

          {/* CURRENT IMAGE (EDIT MODE ONLY) */}
          {editingId && currentImage && (
            <div className="current-image-box">
              <img
                src={`${API_URL}${currentImage}`}
                alt="Current"
              />
              <span>Current Image</span>
            </div>
          )}

          {/* FILE INPUT */}
          <input
            type="file"
            ref={fileRef}
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />

          {/* SUBMIT BUTTON */}
          <button className="admin-submit-btn">
            {editingId ? "Update Item" : "Add Item"}
          </button>
        </form>

        {/* MENU LIST */}
        {menu.map((item) => (
          <div key={item.id} className="admin-row">
            <span>{item.name} – ${item.price}</span>
            <div>
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default AdminMenu;
