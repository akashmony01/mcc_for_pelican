// Filter functionality
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search');
  const authorInput = document.getElementById('author');
  const tagCheckboxes = document.querySelectorAll('.tag-checkbox');
  const fromDateInput = document.getElementById('from-date');
  const toDateInput = document.getElementById('to-date');
  const resetButton = document.getElementById('reset-filters');
  const postsGrid = document.getElementById('posts-grid');
  const noResults = document.getElementById('no-results');
  const blogCards = document.querySelectorAll('.blog-card');

  // Function to filter blog posts
  const filterPosts = () => {
    const searchTerm = searchInput?.value.toLowerCase() || '';
    const authorTerm = authorInput?.value.toLowerCase() || '';
    const fromDate = fromDateInput?.value || '';
    const toDate = toDateInput?.value || '';

    // Get selected tags
    const selectedTags = Array.from(tagCheckboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);

    let visibleCount = 0;

    blogCards.forEach(card => {
      const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
      const description = card.querySelector('p')?.textContent.toLowerCase() || '';
      const author = card.getAttribute('data-author')?.toLowerCase() || '';
      const date = card.getAttribute('data-date') || '';
      const tags = (card.getAttribute('data-tags') || '').split(',');

      // Check if post matches all filters
      const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
      const matchesAuthor = !authorTerm || author.includes(authorTerm);
      const matchesFromDate = !fromDate || date >= fromDate;
      const matchesToDate = !toDate || date <= toDate;

      // Check if post has at least one of the selected tags (or if no tags are selected)
      const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => tags.includes(tag));

      // Show/hide the blog card
      if (matchesSearch && matchesAuthor && matchesFromDate && matchesToDate && matchesTags) {
        card.classList.remove('hidden');
      visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    // Show/hide no results message
    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  };

  // Add event listeners
  searchInput?.addEventListener('input', filterPosts);
  authorInput?.addEventListener('input', filterPosts);
  tagCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', filterPosts);
  });
  fromDateInput?.addEventListener('change', filterPosts);
  toDateInput?.addEventListener('change', filterPosts);

  // Reset filters
  resetButton?.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    if (authorInput) authorInput.value = '';
    tagCheckboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
    if (fromDateInput) fromDateInput.value = '';
    if (toDateInput) toDateInput.value = '';

    filterPosts();
  });
});