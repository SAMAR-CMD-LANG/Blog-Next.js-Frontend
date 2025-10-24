"use client";

import ProtectedRoute from "@/app/components/ProtectedRoute";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export default function PostsPage() {
  return (
    <ProtectedRoute>
      <PostsContent />
    </ProtectedRoute>
  );
}

function PostsContent() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchPosts() {
    setLoading(true);
    setError("");
    try {
      const data = await api(`/posts?page=${page}&limit=5&search=${search}`);
      setPosts(data.posts);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [page, search]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // reset to first page on search
    fetchPosts();
  };

  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));

  return (
    <div style={{ padding: "20px" }}>
      <h1>Posts</h1>

      {/* Search */}
      <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Posts List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts.map((post) => (
          <li
            key={post.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
            }}
          >
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            {post.user_id && <p style={{ fontSize: "0.8em", color: "#555" }}>Author: {post.user_id}</p>}
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={handlePrev} disabled={page === 1}>
          Prev
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
