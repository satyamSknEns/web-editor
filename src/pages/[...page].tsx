import React from "react";
import Header from "./components/Header";
import { builder, BuilderComponent, useIsPreviewing } from "@builder.io/react";
import { BuilderContent } from "@builder.io/sdk";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import { GetStaticProps } from "next";

builder.init("142ae83a7d9349ccaad71add607b51ec");

interface PageProps {
  page: BuilderContent | null;
}

//------------------ Fetch Builder content for the given page
export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const urlPath = params?.page ? "/" + (params.page as string[]).join("/") : "/";
    const page = await builder
      .get("page", {
        userAttributes: {
          urlPath,
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

//----------------- Generate static paths for all pages in Builder
export async function getStaticPaths() {
  try {
    const pages = await builder.getAll("page", {
      fields: "data.url",
      options: { noTargeting: true },
    });

    return {
      paths: pages.map((page) => ({ params: { page: page.data?.url === "/" ? [] : [page.data?.url.replace("/", "")] } })),
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Error fetching static paths:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
}

export default function Page({ page }: PageProps) {
  const isPreviewing = useIsPreviewing();

  if (!page && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{page?.data?.title || "Default Title"}</title>
        <meta name="description" content={page?.data?.description || "Default description"} />
      </Head>
      <Header />
      <BuilderComponent model="page" content={page || undefined} />
    </>
  );
}
