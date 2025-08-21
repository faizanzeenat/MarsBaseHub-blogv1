async function loadPosts() {
  const res = await fetch('assets/posts.json');
  const posts = await res.json();
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('post');
  const content = document.getElementById('content');

  if (slug) {
    const post = posts.find(p => p.slug === slug);
    if (post) {
      const html = await fetch(`posts/${post.file}`).then(r => r.text());
      content.innerHTML = html;
    } else {
      content.innerHTML = "<h2>Post not found</h2>";
    }
  } else {
    content.innerHTML = posts.map(
      p => `
        <div class="post-card">
          <h2><a href="?post=${p.slug}">${p.title}</a></h2>
          <p>${p.excerpt}</p>
        </div>
      `
    ).join('');
  }
}
loadPosts();
