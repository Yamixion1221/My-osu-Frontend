"use client";

import { useEffect, useState } from "react";
import { getTrendingPosts, getCategories, getCategoryPosts } from "../lib/wordpress";
import PostCard from "../components/PostCard";
import SidebarLayout from "../components/SidebarLayout";

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryPosts, setCategoryPosts] = useState([]);
  const [activeCat, setActiveCat] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getTrendingPosts().then(setTrending).catch(console.error);
  }, []);

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    getCategoryPosts(activeCat, search).then(setCategoryPosts).catch(console.error);
  }, [activeCat, search]);

  return (
    <SidebarLayout>
      {/* Trending Models */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Trending Models</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {trending.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* Models Category */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Models Category</h2>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-1 rounded-md text-sm"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-4 overflow-x-auto border-b pb-2 mb-6 text-sm font-medium">
          <button
            onClick={() => setActiveCat("all")}
            className={`whitespace-nowrap ${
              activeCat === "all" ? "text-pink-500 border-b-2 border-pink-500" : "text-gray-600"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={`whitespace-nowrap ${
                activeCat === cat.id ? "text-gray-500 border-b-2 border-pink-500" : "text-gray-600"
              }`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        {/* Post List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categoryPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </SidebarLayout>
  );
}
