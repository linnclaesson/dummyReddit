//ACCESS ELEMENTS
// get section for posts by id
let postsContainer = document.getElementById('posts-container');
let createDefault = document.getElementById('create-default');
let createPostDiv = document.getElementById('create-mode');
let plusIcon = document.getElementById('plus');
let inputPost = document.getElementById('input-post');
let closeBtn = document.getElementById('close-btn');
let closeIcon = document.getElementById('close');
let postBtn = document.getElementById('post-btn');

// FUNCTIONS

// ----------- Handle fetch ------------
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
        let title = document.createElement('h2');
        let postBody = document.createElement('p');
        let tags = document.createElement('h4');
        // assign data to element
        title.innerText = item.title;
        postBody.innerText = item.body;
        // regulate structure of tags
        tags.innerText = item.tags.map((tag) => '#' + tag).join(' ');
        // append created elements
        postsContainer.append(post);
        post.append(title, postBody, tags);
    }
};

// Call fetchDummy --> fetch dummy posts
fetchDummy();

// --------- Handle create posts ------------
// event listeners
inputPost.addEventListener('click', toggleCreate);
plusIcon.addEventListener('click', toggleCreate);
closeBtn.addEventListener('click', toggleCreate);
closeIcon.addEventListener('click', toggleCreate);
postBtn.addEventListener('click', newPost);

let showDefault = true;

// Switch create post between default and create-mode
function toggleCreate() {
    showDefault = !showDefault;

    if (showDefault) {
        createDefault.style.display = 'flex';
        createPostDiv.style.display = 'none';
    } else {
        createDefault.style.display = 'none';
        createPostDiv.style.display = 'flex';
    }
}

// Handle input value and publish post
function newPost() {
    let title = document.getElementById('input-title').value;
    let postBody = document.getElementById('input-post-body').value;
    let tags = document.getElementById('input-tags').value;
    console.log(title, postBody, tags);

    // create new elements
    let newPost = document.createElement('div');
    let newTitle = document.createElement('h2');
    let newPostBody = document.createElement('p');
    let newTags = document.createElement('h4');
    // assign data to element
    newTitle.innerText = title;
    newPostBody.innerText = postBody;
    // regulate structure of tags
    newTags.innerText = tags; //.map((tag) => '#' + tag).join(' ');
    // append created elements
    postsContainer.append(newPost);
    newPost.append(newTitle, newPostBody, newTags);

    // reset input values
    document.getElementById('input-title').value = '';
    document.getElementById('input-post-body').value = '';
    document.getElementById('input-tags').value = '';

    // switch back to create default-mode
    toggleCreate();
}
