export default function renderCommentSection(comments) {
    return `
        <div class="comment-section">
            <h2>${comments.length} Comments</h2>
            <form id="comment-form" class="comment-form">
                <textarea name="commentText" placeholder="Add a comment..."></textarea>
                <div class="comment-form-actions">
                    <button type="button">Cancel</button>
                    <button type="submit" class="submit-comment">Comment</button>
                </div>
            </form>
            <div class="comment-list">
                ${comments.map(comment => `
                    <div class="comment">
                        <div class="channel-avatar"></div>
                        <div>
                            <div class="comment-meta"><strong>${comment.user}</strong> <span>${comment.timestamp}</span></div>
                            <p class="comment-body">${comment.text}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}