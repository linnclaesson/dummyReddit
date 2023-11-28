// get section for posts by id
let postsContainer = document.getElementById('posts-container');

// FUNCTIONS
// fetch dummy posts
fetchDummy = () => {
    fetch('https://dummyjson.com/posts?limit=4&skip=20')
        .then((res) => res.json())
        .then((res) => {
            console.log('fetched posts');
            // call renderDummyPosts
            renderDummyPosts(res.posts);
        });
};

// render dummy posts
renderDummyPosts = (res) => {
    console.log(res);
};

// CALL FUNCTIONS
fetchDummy();
