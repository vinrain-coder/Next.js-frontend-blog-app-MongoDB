import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Shoepedi Blog</title>
        <meta
          name="description"
          content="This is the shoepedi blog to inform the shoe lovers of the latest trends and offers"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Home</h1>
    </>
  );
}
