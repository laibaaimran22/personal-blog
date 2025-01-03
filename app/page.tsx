import Image from "next/image";
import Link from "next/link"; // Import Link
import { SanityTypes } from "@/@types";
import { client } from "@/sanity/lib/client";
import { Card } from "@/components/ui/card";
import { urlFor } from "@/sanity/lib/image";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ShineBorder from "@/components/ui/shine-border";
import { Metadata } from "next";
import { site } from "@/site";


export const revalidate = 60; // Revalidate API call every 60 seconds

async function getPosts() {
  const query = `
  *[_type == 'post'] | order(_createdAt desc)
  `;
  return await client.fetch(query);
}

export default async function Home() {
  const posts: SanityTypes.Post[] = await getPosts();

  return (
    <div className="flex flex-col items-center w-full bg-gray-50 dark:bg-gray-900">
      {/* Adjusted height to allow some space at the bottom */}
      <div className="min-h-[calc(100vh-5rem)] w-full flex flex-1 max-w-[1500px] md:px-14 pt-24 px-4 flex-col space-y-4 pb-36">
        <ShineBorder
          borderWidth={3}
          className="relative flex h-[250px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-white dark:bg-gray-800 shadow-md"
          color={["#3B82F6", "#10B981", "#22D3EE"]} // Softer blue, green, and cyan
        >
          <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-blue-500 to-green-400 bg-clip-text text-transparent text-center text-4xl lg:text-6xl font-bold dark:from-cyan-400 dark:to-teal-300">
            Welcome to the Blog
          </span>
        </ShineBorder>
        <div className="grid md:grid-cols-3 gap-8 grid-cols-1">
          {posts.map((post: SanityTypes.Post, key: number) => (
            <Link
              key={key}
              href={`/post/${post.slug.current}`}
              className="space-y-4 cursor-pointer"
            >
              <Card className="flex flex-col justify-between h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow">
                {/* Image Container */}
                <div className="h-60 w-full overflow-hidden rounded-lg relative group">
                  {/* Overlay for hover effect */}
                  <div className="h-full w-full bg-black opacity-0 absolute z-20 group-hover:opacity-10 transition-opacity duration-300" />
                  <Image
                    src={urlFor(post.image).url() || ""}
                    fill
                    alt={post.title}
                    className="h-full object-cover w-full"
                  />
                </div>

                {/* Blog Content */}
                <div className="flex flex-1 flex-col space-y-3 px-3 py-2">
                  <div className="flex flex-row items-center space-x-2">
                    <CalendarIcon size={20} className="text-blue-500 dark:text-teal-400" />
                    <p className="font-medium text-sm text-gray-600 dark:text-gray-300">
                      {new Date(post._createdAt).toDateString()}
                    </p>
                  </div>
                  <h2 className="text-lg font-extrabold text-gray-800 dark:text-gray-100">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                    {post.description}
                  </p>
                </div>

                {/* Button */}
                <div className="px-4 py-2">
                  <Button className="w-full py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 dark:bg-teal-500 dark:hover:bg-teal-600 transition-colors">
                    <p>Read more</p>
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

