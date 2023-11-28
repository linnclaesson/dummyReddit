// get section for posts by id
let postsContainer = document.getElementById('posts-container');

// FUNCTIONS
// fetch dummy posts
fetchDummy = () => {
    fetch('https://dummyjson.com/posts?limit=4&skip=20')
        .then((res) => res.json())
        .then((res) => {
            console.log('fetch successful');
            // call renderDummyPosts
            renderDummyPosts(res.posts);
        });
};

// render dummy posts: create elements to display the fetched data in browser
renderDummyPosts = (res) => {
    // log the fetched data
    console.log(res);

    // loop through fetched data
    for (let i = 0; i < res.length; i++) {
        let item = res[i];
        // create elements
        let post = document.createElement('div');
        // assign data to element
        post.innerText = item.title;
        // append created elements
        postsContainer.append(post);
    }
};

// CALL FUNCTIONS
fetchDummy();
