import React from "react";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { builder, BuilderComponent, useIsPreviewing } from "@builder.io/react";
import { BuilderContent } from "@builder.io/sdk";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import { GetStaticProps } from "next";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

builder.init("142ae83a7d9349ccaad71add607b51ec");

interface PageProps {
  page: BuilderContent | null;
}

// Fetch content for the home page from Builder.io
export const getStaticProps: GetStaticProps = async () => {
  try {
    const page = await builder
      .get("page", {
        userAttributes: {
          urlPath: "/",
        },
      })
      .toPromise();

    return {
      props: {
        page: page || null,
      },
      revalidate: 5, 
    };
  } catch (error) {
    console.error("Error fetching Builder.io page:", error);
    return {
      props: { page: null },
    };
  }
};

export default function Home({ page }: PageProps) {
  const isPreviewing = useIsPreviewing();

  if (!page && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{page?.data?.title || "Home"}</title>
        <meta
          name="description"
          content={page?.data?.description || "Welcome to our website"}
        />
      </Head>
      <Header />
      <div
        className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)]`}
      >
        <main className="">
          <BuilderComponent model="page" content={page || undefined} />
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center relative py-4 mt-4 shadow-md border-[1px] border-slate-500 bottom-0 left-0 right-0">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a>
        </footer>
      </div>
    </>
  );
}
