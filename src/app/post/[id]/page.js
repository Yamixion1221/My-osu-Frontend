import SidebarLayout from "../../../components/SidebarLayout";
import { getPost } from "../../../lib/wordpress";

function stripHtml(html) {
  return html.replace(/<[^>]*>?/gm, "");
}

// ✅ tunggu params dulu
export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = await getPost(id);

  return {
    title: post.title.rendered,
    description: stripHtml(post.excerpt.rendered),
  };
}

export default async function PostDetail({ params }) {
  const { id } = await params; // ✅ di-await dulu
  const post = await getPost(id);

  const featured =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/default.jpg";

  return (
    <SidebarLayout>
      <main className="max-w-3xl mx-auto p-6">
        <img src={featured} alt={post.title.rendered} className="rounded-xl mb-4" />
        <h1
          className="text-3xl font-bold mb-4"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <article
          className="prose lg:prose-xl dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </main>
    </SidebarLayout>
  );
}
