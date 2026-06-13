<?php global $SITE, $telLink; $wa = whatsapp_link("Hi " . $SITE['shortName'] . ", I'd like to enquire about your aluminium & glass services."); ?>
<!-- Floating actions -->
<div class="floating">
  <button class="top" id="scrollTop" aria-label="Scroll to top">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1.25rem;height:1.25rem"><path d="m18 15-6-6-6 6"/></svg>
  </button>
  <a href="<?= esc($wa) ?>" target="_blank" rel="noopener" class="wa" aria-label="Chat on WhatsApp">
    <span class="ping"></span>
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.27.86 5.82 2.42a8.2 8.2 0 0 1 2.42 5.82c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.24-8.24zm-3.6 4.43c-.17 0-.45.06-.68.31-.23.25-.9.88-.9 2.15s.92 2.49 1.05 2.66c.13.17 1.81 2.76 4.39 3.87.61.26 1.09.42 1.46.54.61.2 1.17.17 1.61.1.49-.07 1.51-.62 1.72-1.21.21-.59.21-1.1.15-1.21-.06-.1-.23-.16-.48-.29-.25-.12-1.51-.74-1.74-.83-.23-.08-.4-.12-.57.13-.17.25-.65.83-.8 1-.15.17-.29.19-.54.06-.25-.12-1.07-.39-2.03-1.26-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.39-.78-1.9-.2-.46-.41-.4-.57-.41z"/></svg>
  </a>
</div>

<div class="toast-wrap" id="toastWrap"></div>
<script src="/assets/js/main.js"></script>
</body>
</html>
