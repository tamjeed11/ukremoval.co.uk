// ═══════════════════════════════════════════════════════════════
//  UK REMOVAL & LOGISTICS  BLOG DATA v4
//  • No hardcoded/default posts  live data only from Google Sheets
//  • sessionStorage cache: instant on repeat visits (5 min TTL)
//  • 5 s fetch timeout with AbortController
//  • Skeleton loaders shown while fetching
// ═══════════════════════════════════════════════════════════════

const BLOG_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzob6s6knmBhVsm21IVKpUckK8nrK2tjDI4YX5koHBzMKhAtMUhpaKZAmIp5EiEufAw/exec';

const CACHE_KEY = 'rm_blog_posts';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// No static fallback posts  live data only
window.BLOG_POSTS = [];

(function () {
  // ── 1. Try sessionStorage cache first (instant) ──
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      const { ts, posts } = JSON.parse(cached);
      if (Date.now() - ts < CACHE_TTL && Array.isArray(posts) && posts.length > 0) {
        window.BLOG_POSTS = posts;
        // Posts are ready before DOMContentLoaded fires  blog.html will pick them up
        return;
      }
    }
  } catch (e) { /* sessionStorage unavailable */ }

  // ── 2. Fetch from Google Sheets with 5 s timeout ──
  if (!BLOG_SCRIPT_URL) return;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);

  fetch(BLOG_SCRIPT_URL + '?action=getPosts', { signal: controller.signal })
    .then(r => r.json())
    .then(data => {
      clearTimeout(timer);
      if (data.success && Array.isArray(data.posts) && data.posts.length > 0) {
        window.BLOG_POSTS = data.posts;

        // Cache for next visit
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), posts: data.posts }));
        } catch (e) { /* quota exceeded */ }

        // Trigger re-render if blog page is already mounted
        if (typeof window.renderBlog === 'function') window.renderBlog();
        if (typeof window.renderPost === 'function') {
          const slug = new URLSearchParams(window.location.search).get('slug');
          if (slug) {
            const post = data.posts.find(p => p.slug === slug);
            if (post) window.renderPost(post);
          }
        }
      } else {
        // Google Sheets returned no posts
        if (typeof window.renderBlog === 'function') window.renderBlog();
      }
    })
    .catch(() => {
      clearTimeout(timer);
      // Fetch failed or timed out  show empty state
      if (typeof window.renderBlog === 'function') window.renderBlog();
    });
})();
