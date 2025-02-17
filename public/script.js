// Fetch comments from the backend and display them
async function loadComments() {
  const response = await fetch('/comments');
  const comments = await response.json();

  const commentsContainer = document.getElementById('commentsContainer');
  commentsContainer.innerHTML = comments
    .map(
      (comment) => `
      <div class="comment">
          <p>${comment.text}</p>
          <small>${new Date(comment.timestamp).toLocaleString()}</small>
      </div>
  `
    )
    .join('');
}

// Submit a new comment
document
  .getElementById('commentForm')
  .addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form from refreshing

    const commentInput = document.getElementById('commentInput').value.trim();
    if (!commentInput) return;

    await fetch('/add-comment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: commentInput }),
    });

    document.getElementById('commentInput').value = ''; // Clear input
    loadComments(); // Refresh comments
  });

// Load comments when the page loads
loadComments();
