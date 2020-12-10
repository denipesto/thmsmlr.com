import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import Layout from 'layouts';
import Navigation from 'components/Navigation';
import Footer from 'components/Footer';

export default function Page({ posts }) {
  return (
    <Layout>
      <Head>
        <title>thmsmlr – Blog</title>
        <link rel="stylesheet" href="/css/notion.css" />
      </Head>
      <Navigation />

      <div className="max-w-screen-sm mx-auto px-6 md:px-2">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-gray-800">The Blog</h1>
        <p className="mt-2 text-gray-700">
          I haven't written much, but what I have written you can find below.
        </p>
      </div>

      <div className="mt-10 max-w-screen-sm mx-auto px-6 md:px-2">
        <div className="space-y-8">
          {posts.map((post) => (
            <Link href={`/blog/${post.Slug}`} key={post.Name}>
              <a className="block group">
                <h3 className="text-lg md:text-xl font-medium ">{post.Name}</h3>
                <p className="mt-1 text-gray-700">{post.Description}</p>
                <p className="mt-1 font-light text-gray-500 group-hover:underline">
                  Read this Article &rarr;
                </p>
              </a>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </Layout>
  );
}

export async function getStaticProps(ctx) {
  let resp;
  resp = await fetch(
    'https://notion-api.splitbee.io/v1/table/4eb4df60-9e1c-4e8d-a3ef-29f24e7f555f'
  );

  let posts = await resp.json();
  posts = posts.filter((x) => x.isPublished);

  return {
    props: {
      posts,
    },
    revalidate: 1,
  };
}
