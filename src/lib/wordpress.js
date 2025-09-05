export async function getTrendingPosts() {
  const res = await fetch(
    `https://arara.rf.gd/wp-json/wp/v2/posts?_embed&per_page=8`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error("Failed to fetch trending posts");
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`https://arara.rf.gd/wp-json/wp/v2/categories`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function getCategoryPosts(cat = "all", search = "") {
  let url = `https://arara.rf.gd/wp-json/wp/v2/posts?_embed&per_page=8`;
  if (cat !== "all") url += `&categories=${cat}`;
  if (search) url += `&search=${encodeURIComponent(search)}`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch category posts");
  return res.json();
}

export async function getPost(id) {
  const res = await fetch(`https://arara.rf.gd/wp-json/wp/v2/posts/${id}?_embed`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}
