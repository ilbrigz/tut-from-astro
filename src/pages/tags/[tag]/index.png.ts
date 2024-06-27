import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { generateOgImageForPost } from "../../../utils/generateOgImages";

export async function getStaticPaths(): Promise<
  {
    params: {
      tag: string;
    };
  }[]
> {
  const t: any = import.meta.glob("../../posts/*.md", { eager: true });
  const allPosts = Object.values(t);
  console.log("ALLPOSTS", allPosts);
  const uniqueTags = [
    ...new Set(allPosts.map((post: any) => post.frontmatter.tags).flat()),
  ];
  console.log("uniqueTags", uniqueTags);
  return uniqueTags.map((tag: any) => {
    const filteredPosts = allPosts.filter((post: any) =>
      post.frontmatter.tags.includes(tag)
    );
    console.log("filteredPosts", filteredPosts);
    console.log("TAG", tag);
    return {
      params: { tag: tag },
      props: { posts: filteredPosts },
    };
  });
}

// const { tag } = Astro.params;
// const { posts } = Astro.props;

// export async function getStaticPaths() {
//   const posts = await getCollection("blog").then((p) =>
//     p.filter(({ data }) => !data.draft && !data.ogImage)
//   );

//   return posts.map((post) => ({
//     params: { slug: slugifyStr(post.data.title) },
//     props: post,
//   }));
// }

export const GET: APIRoute = async ({ props }) =>
  new Response(await generateOgImageForPost(props as CollectionEntry<"blog">), {
    headers: { "Content-Type": "image/png" },
  });
