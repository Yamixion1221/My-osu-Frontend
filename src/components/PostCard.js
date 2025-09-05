import Link from "next/link";

export default function PostCard({ post }) {
  const featured =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/default.jpg";

  return (
    <Link href={`/post/${post.id}`} className="block">
      <div className="bg-white rounded-2xl shadow hover:shadow-lg overflow-hidden transition text-gray-900">
        <img src={featured} alt={post.title.rendered} className="h-36 w-full object-cover" />
        <div className="p-3">
          <h2
            className="text-base font-semibold line-clamp-2 mb-1"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <p
  className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2"
  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
/>
        </div>
      </div>
    </Link>
  );
}
