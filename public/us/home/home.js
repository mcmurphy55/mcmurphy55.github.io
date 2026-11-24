// The two-minute film is a picture and a link to YouTube until someone asks to play it: only then
// is the player loaded, from YouTube's no-cookie address, so the page itself calls on no one else.
for (const link of document.querySelectorAll('a.watch[data-video]')) {
  link.addEventListener('click', (event) => {
    // A click that asks for a new tab or window keeps its meaning.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    const player = document.createElement('div');
    player.className = 'player';
    const frame = document.createElement('iframe');
    frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(link.dataset.video)}?autoplay=1&rel=0&playsinline=1`;
    frame.title = link.dataset.title ?? '';
    frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    frame.allowFullscreen = true;
    player.append(frame);
    link.replaceWith(player);
  });
}

// The half-minute film shows its first card with one round play mark; the browser's own controls
// come when it starts. Without this script the film simply has its controls from the start.
for (const film of document.querySelectorAll('.film video')) {
  const start = document.createElement('button');
  start.type = 'button';
  start.className = 'play';
  const label = document.createElement('span');
  label.textContent = film.getAttribute('aria-label') ?? '';
  start.append(label);
  film.controls = false;
  film.after(start);
  start.addEventListener('click', () => {
    start.remove();
    film.controls = true;
    film.play();
  });
}
