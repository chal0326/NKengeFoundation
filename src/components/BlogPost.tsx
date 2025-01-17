import React from 'react';

interface BlogPostProps {
  title: string;
  content: string;
  publishedAt: string;
  image?: {
    url: string;
    alternativeText: string;
  };
}

export function BlogPost({ title, content, publishedAt, image }: BlogPostProps) {
  return (
    <article className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <time className="text-gray-500 mb-4 block">
        {new Date(publishedAt).toLocaleDateString()}
      </time>
      {image && (
        <img
          src={image.url}
          alt={image.alternativeText}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}
      <div className="prose prose-lg">{content}</div>
    </article>
  );
} 