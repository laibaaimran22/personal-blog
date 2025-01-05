import React from "react";

export default function StructuredData({ data }: { data: Record<string, unknown> }) {
  const serializedData = JSON.stringify(data); // Ensure consistent serialization

  return (
    <script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializedData }}
    />
  );
}
