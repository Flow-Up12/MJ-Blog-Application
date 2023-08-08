const NewPost = ({
    handleSubmit, postTitle, setPostTitle, postBody, setPostBody, selectedImage, handleImageChange
}) => {
    
    
    return (
        <main className="NewPost">
            <h2>New Post</h2>
            <form className="newPostForm" onSubmit={handleSubmit}>
                <label htmlFor="postTitle">Title:</label>
                <input
                    id="postTitle"
                    type="text"
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                />
                <label htmlFor="postBody">Post:</label>
                <textarea
                    id="postBody"
                    required
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                />
                <label htmlFor="imageInput">Image:</label>
                <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
               {selectedImage && <img src={selectedImage} alt="Selected" />}
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}

export default NewPost
