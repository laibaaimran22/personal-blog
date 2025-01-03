'use client';

import React, { useState } from 'react';

const CommentSection = () => {
    const [comments, setComments] = useState<{ text: string }[]>([]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const text = (form.elements.namedItem('comment') as HTMLTextAreaElement).value;
        setComments([...comments, { text }]);
        form.reset();
    };

    return (
        <div className="mt-10 w-full max-w-5xl">
            <h2 className="text-2xl font-bold mb-4">Leave a Comment</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <textarea
                    name="comment"
                    className="w-full h-24 p-2 border border-gray-300 rounded-md"
                    placeholder="Write your comment here..."
                    required
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                >
                    Submit
                </button>
            </form>
            <div className="mt-6 space-y-4">
                {comments.map((comment, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-md">
                        <p>{comment.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentSection;
