//ACCESS DOM ELEMENTS
let postsContainer = document.getElementById('posts-container');
let createDefault = document.getElementById('create-default');
let createPostDiv = document.getElementById('create-mode');
let plusIcon = document.getElementById('plus');
let inputPost = document.getElementById('input-post');
let closeBtn = document.getElementById('close-btn');
let closeIcon = document.getElementById('close');
let postBtn = document.getElementById('post-btn');
// VARIABLES
let down;
let up;
let allPosts = [];

// FUNCTIONS

// Load posts from local storage
let savedPosts = localStorage.getItem('RedditPosts');
// if there are posts stored, render them to browser
if (savedPosts !== null) {
    allPosts = JSON.parse(savedPosts);
    console.log('Data found');
    console.log(allPosts);
    renderPosts(allPosts);
} else {
    console.log('No data in local storage: fetch Dummy posts');
    // Call fetch dummy
    fetchDummy();
}

// save to local storage
function storePosts(posts) {
    localStorage.setItem('RedditPosts', JSON.stringify(posts));
}

// Un-comment to clear local storage
//localStorage.removeItem('RedditPosts');

// ----------- Handle fetch ------------
// fetch dummy posts
function fetchDummy() {
    fetch('https://dummyjson.com/posts?limit=35&skip=30')
        .then((res) => res.json())
        .then((res) => {
            console.log('fetch successful');
            let fetchedData = res.posts;
            allPosts = fetchedData;

            // store fetched posts and render them in browser
            storePosts(fetchedData);
            renderPosts(allPosts);
        });
}

// render all posts
function renderPosts(allPosts) {
    console.log('I got here!');
    // loop through fetched data
    for (let i = 0; i < allPosts.length; i++) {
        let item = allPosts[i];
        // create elements
        let post = document.createElement('section');
        let content = document.createElement('div');
        let title = document.createElement('h2');
        let postBody = document.createElement('p');
        let tags = document.createElement('h4');
        let reactSection = document.createElement('section');
        let reactions = document.createElement('p');
        down = document.createElement('img');
        up = document.createElement('img');

        // assign data to element
        title.innerText = item.title;
        postBody.innerText = item.body;
        reactions.innerText = item.reactions;
        // regulate structure of tags
        tags.innerText = item.tags.map((tag) => '#' + tag).join(' ');
        // img
        down.src = './img/down.png';
        up.src = './img/up.png';
        // append created elements
        postsContainer.append(post);
        post.append(reactSection, content);
        content.append(title, postBody, tags);
        reactSection.append(up, reactions, down);

        up.addEventListener('click', () => {
            item.reactions++;
            reactions.innerText = item.reactions;
            storePosts(allPosts);
        });
        down.addEventListener('click', () => {
            item.reactions--;
            reactions.innerText = item.reactions;
            storePosts(allPosts);
        });
    }
}

// --------- Handle create posts ------------
// Event listeners
inputPost.addEventListener('click', toggleCreate);
plusIcon.addEventListener('click', toggleCreate);
closeBtn.addEventListener('click', toggleCreate);
closeIcon.addEventListener('click', toggleCreate);
postBtn.addEventListener('click', newPost);

let showDefault = true;

// Toggle create post between default and create-mode
function toggleCreate() {
    showDefault = !showDefault;

    if (showDefault) {
        createDefault.style.display = 'flex';
        createPostDiv.style.display = 'none';
    } else {
        createDefault.style.display = 'none';
        createPostDiv.style.display = 'flex';
    }
    // reset input values
    document.getElementById('input-title').value = '';
    document.getElementById('input-post-body').value = '';
    document.getElementById('input-tags').value = '';
}

// Handle input value and publish post
function newPost() {
    let title = document.getElementById('input-title').value;
    let postBody = document.getElementById('input-post-body').value;
    let tags = document.getElementById('input-tags').value;
    tags = tags.split(' '); // america history cookie => ["america", "history", "cookie"]

    console.log(title, postBody, tags);

    let createNewPost = {
        title,
        body: postBody,
        tags,
        reactions: 0,
    };
    allPosts.unshift(createNewPost);
    storePosts(allPosts);

    // create new elements
    let newPost = document.createElement('section');
    let newTitle = document.createElement('h2');
    let newPostBody = document.createElement('p');
    let newTags = document.createElement('h4');
    let content = document.createElement('div');
    let reactSection = document.createElement('section');
    let reactions = document.createElement('p');
    down = document.createElement('img');
    up = document.createElement('img');
    // put newPost at top of page
    newPost.style.order = '-1';
    // img
    down.src = './img/down.png';
    up.src = './img/up.png';
    // assign data to element
    newTitle.innerText = title;
    newPostBody.innerText = postBody;
    reactions.innerText = createNewPost.reactions;
    // regulate structure of tags
    newTags.innerText = tags.map((tag) => '#' + tag).join(' ');
    // append created elements
    postsContainer.append(newPost);
    newPost.append(reactSection, content);
    content.append(newTitle, newPostBody, newTags);
    reactSection.append(up, reactions, down);

    up.addEventListener('click', () => {
        createNewPost.reactions++;
        reactions.innerText = createNewPost.reactions;
        storePosts(allPosts);
    });
    down.addEventListener('click', () => {
        createNewPost.reactions--;
        reactions.innerText = createNewPost.reactions;
        storePosts(allPosts);
    });
    // switch back to create default-mode
    toggleCreate();
}
