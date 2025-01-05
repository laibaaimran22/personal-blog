// import React from 'react';
// import moment from 'moment';
// import { client } from '@/sanity/lib/client';
// import { SanityTypes } from '@/@types';
// import { Label } from '@/components/ui/label';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import { CalendarIcon } from 'lucide-react';
// import Image from 'next/image';
// import { urlFor } from '@/sanity/lib/image';
// import { PortableText } from 'next-sanity';
// import { Metadata } from 'next';
// import { site } from '@/site';
// import { WithContext, BlogPosting } from 'schema-dts';
// import StructuredData from '@/components/StructuredData';
// import CommentSection from '@/components/Comment-Section'; // Directly import the Client Component

// type Props = {
//     params: { slug: string };
//     searchParams: { [key: string]: string | string[] | undefined };
// };

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//     const query = `
//     *[_type == 'post' && slug.current == $slug] {
//         _id,
//         title,
//         description,
//         image
//     }[0]
//     `;
//     const data = await client.fetch(query, { slug: params.slug });
//     return {
//         applicationName: 'My Personal Blog',
//         creator: 'Laiba Imran',
//         metadataBase: new URL(site.url),
//         title: data?.title || 'Blog Post',
//         description: data?.description || 'Read more on our blog.',
//         openGraph: {
//             title: data?.title || 'Blog Post',
//             description: data?.description || 'Read more on our blog.',
//             images: data?.image ? urlFor(data.image)?.url() || '' : '',
//             type: 'article',
//             locale: 'en_AU',
//         },
//         authors: [{ name: 'Laiba Imran' }],
//     };
// }

// export const revalidate = 60;

// async function getPost(slug: string): Promise<SanityTypes.Post | null> {
//     const query = `
//     *[_type == 'post' && slug.current == $slug] {
//         _createdAt,
//         _id,
//         title,
//         description,
//         content,
//         image,
//         author->{
//             name
//         }
//     }[0]
//     `;
//     return await client.fetch(query, { slug });
// }

// export default async function Page({ params: { slug } }: { params: { slug: string } }) {
//     const post = await getPost(slug);

//     if (!post) {
//         return (
//             <>
//                 <StructuredData data={{}} /> {/* Empty schema data */}
//                 <div className="flex items-center justify-center h-screen">
//                     <p>Post not found. Please check the URL.</p>
//                 </div>
//             </>
//         );
//     }

//     const schemaData: WithContext<BlogPosting> = {
//         '@context': 'https://schema.org',
//         '@type': 'BlogPosting',
//         headline: post.title || 'Untitled Post',
//         description: post.description || 'No description available.',
//         image: urlFor(post.image)?.url() || '',
//         author: {
//             '@type': 'Person',
//             name: post.author?.name || 'Unknown Author',
//             url: 'https://www.linkedin.com/in/laiba-imran-0175a7279',
//         },
//         mainEntityOfPage: {
//             '@type': 'WebPage',
//             '@id': site.url,
//         },
//         datePublished: post._createdAt ? moment(post._createdAt).format('YYYY-MM-DD') : '',
//         publisher: {
//             '@type': 'Person',
//             name: post.author?.name || 'Unknown Author',
//         },
//     };

//     return (
//         <div className="flex flex-col items-center w-full bg-background px-4 py-30 pb-96">
//             <StructuredData data={schemaData} />
//             <div className="h-full w-full flex flex-1 max-w-5xl pb-24 md:px-14 pt-32 px-4 flex-col space-y-6">
//                 <Label className="text-5xl max-w-4xl tracking-tighter font-extrabold">
//                     {post.title}
//                 </Label>
//                 <div className="flex flex-row items-center space-x-3 pb-4">
//                     <div className="flex flex-row items-center space-x-2">
//                         <Avatar>
//                             <AvatarFallback>
//                                 {post.author?.name?.[0] || '?'}
//                             </AvatarFallback>
//                         </Avatar>
//                         <p className="font-bold text-lg">{post.author?.name || 'Unknown Author'}</p>
//                     </div>
//                     <div className="flex flex-row items-center gap-x-2">
//                         <CalendarIcon size={20} className="text-primary" />
//                         <span className="text-gray-500 text-sm">
//                             {post._createdAt ? new Date(post._createdAt).toDateString() : ''}
//                         </span>
//                     </div>
//                 </div>
//                 {post.image && (
//                     <div className="w-full h-96 max-h-76 relative overflow-hidden">
//                         <Image
//                             src={urlFor(post.image)?.url() || ''}
//                             alt={post.title || 'Blog Image'}
//                             fill
//                             className="h-full w-full object-cover object-center rounded-lg"
//                         />
//                     </div>
//                 )}
//                 <article className="prose lg:prose-lg dark:prose-invert pt-6">
// //                     <PortableText value={post.content || []} />
// //                 </article>

// //                 {/* Comment Section */}
// //                 <CommentSection />
// //             </div>
// //         </div>
// //     );
// // }

import React from "react";
import moment from "moment";
import { client } from "@/sanity/lib/client";
import { SanityTypes } from "@/@types";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import { Metadata } from "next";
import { site } from "@/site";
import StructuredData from "@/components/StructuredData";
import CommentSection from "@/components/Comment-Section";

type PageParams = {
  slug: string;
};

type PageProps = {
  params: PageParams;
};

// Generate metadata for the page
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const query = `
    *[_type == 'post' && slug.current == $slug] {
        _id,
        title,
        description,
        image
    }[0]
  `;
  const data = await client.fetch(query, { slug: params.slug });

  return {
    title: data?.title || "Blog Post",
    description: data?.description || "Read more on our blog.",
    openGraph: {
      title: data?.title || "Blog Post",
      description: data?.description || "Read more on our blog.",
      images: [
        {
          url: data?.image ? urlFor(data.image)?.url() || "" : "",
          width: 800,
          height: 600,
        },
      ],
    },
  };
}

// Revalidate interval for ISR
export const revalidate = 60;

// Fetch post data
async function getPost(slug: string): Promise<SanityTypes.Post | null> {
  const query = `
    *[_type == 'post' && slug.current == $slug] {
        _createdAt,
        _id,
        title,
        description,
        content,
        image,
        author->{
            name
        }
    }[0]
  `;
  return await client.fetch(query, { slug });
}

export default async function Page({ params }: PageProps) {
  const { slug } = params; // Access slug from params
  const post = await getPost(slug);

  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen">
        <StructuredData data={{}} />
        <p>Post not found. Please check the URL.</p>
      </div>
    );
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title || "Untitled Post",
    description: post.description || "No description available.",
    image: urlFor(post.image)?.url() || "",
    author: {
      "@type": "Person",
      name: post.author?.name || "Unknown Author",
      url: "https://www.linkedin.com/in/laiba-imran-0175a7279",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": site.url,
    },
    datePublished: post._createdAt
      ? moment(post._createdAt).format("YYYY-MM-DD")
      : "",
    publisher: {
      "@type": "Person",
      name: post.author?.name || "Unknown Author",
    },
  };

  return (
    <div className="flex flex-col items-center w-full bg-background px-4 py-30 pb-96">
      <StructuredData data={schemaData as Record<string, unknown>} />
      <div className="h-full w-full flex flex-1 max-w-5xl pb-24 md:px-14 pt-32 px-4 flex-col space-y-6">
        <Label className="text-5xl max-w-4xl tracking-tighter font-extrabold">
          {post.title}
        </Label>
        <div className="flex flex-row items-center space-x-3 pb-4">
          <div className="flex flex-row items-center space-x-2">
            <Avatar>
              <AvatarFallback>
                {post.author?.name?.[0] || "?"}
              </AvatarFallback>
            </Avatar>
            <p className="font-bold text-lg">
              {post.author?.name || "Unknown Author"}
            </p>
          </div>
          <div className="flex flex-row items-center gap-x-2">
            <CalendarIcon size={20} className="text-primary" />
            <span className="text-gray-500 text-sm">
              {post._createdAt ? new Date(post._createdAt).toDateString() : ""}
            </span>
          </div>
        </div>
        {post.image && (
          <div className="w-full h-96 max-h-76 relative overflow-hidden">
            <Image
              src={urlFor(post.image)?.url() || ""}
              alt={post.title || "Blog Image"}
              fill
              className="h-full w-full object-cover object-center rounded-lg"
            />
          </div>
        )}
        <article className="prose lg:prose-lg dark:prose-invert pt-6">
          <PortableText value={post.content || []} />
        </article>

        {/* Comment Section */}
        <CommentSection />
      </div>
    </div>
  );
}
