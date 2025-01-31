import BlogCard from "../BlogCard/BlogCard";

export default function BlogCards({ blogData }) {
    return (
        <>
            {blogData.length > 0 ? (
                blogData.map((blog) => (
                    <BlogCard
                        key={blog._id}
                        title={blog.blogTitle}
                        author={blog.blogAuthor.username}
                        date={blog.blogCreatedOn}
                        content={blog.blogContent}
                        id={blog._id}
                        coverImage={blog.blogCoverImage}
                    />
                ))
            ) : (
                <p>No blogs available!</p>
            )}
        </>
    );
};