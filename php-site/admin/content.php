<?php
require_once __DIR__ . '/../includes/helpers.php';
require_admin();
global $DEFAULT_CONTENT;
$admin_active = 'content';
$content = resolved_content();
$admin_scripts = '<script>window.__DEFAULT_CONTENT__=' . json_encode($DEFAULT_CONTENT, JSON_UNESCAPED_SLASHES) . ';window.__CONTENT_KEY__=' . json_encode(CONTENT_KEY) . ';</script><script src="/admin/content.js"></script>';

function tf($label, $section, $key, $val)
{
    return '<div class="field"><label style="font-size:.72rem;color:hsl(var(--muted-foreground))">' . esc($label) . '</label><input value="' . esc($val) . '" data-c="' . esc($section) . '.' . esc($key) . '"></div>';
}
function af($label, $section, $key, $val)
{
    return '<div class="field"><label style="font-size:.72rem;color:hsl(var(--muted-foreground))">' . esc($label) . '</label><textarea rows="3" data-c="' . esc($section) . '.' . esc($key) . '">' . esc($val) . '</textarea></div>';
}

require __DIR__ . '/includes/shell-top.php';
?>
<div class="stack">
  <div class="flex-between">
    <div><h1>Website Content</h1><p style="font-size:.875rem;color:hsl(var(--muted-foreground))">Edit the headline text shown across your homepage.</p></div>
    <div style="display:flex;gap:.5rem">
      <button class="btn btn-outline btn-sm" id="resetBtn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:1rem;height:1rem"><path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5"/></svg> Reset</button>
      <button class="btn btn-gold btn-sm" id="saveBtn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:1rem;height:1rem"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/></svg> Save</button>
    </div>
  </div>

  <div class="dirty-banner" id="dirtyBanner" style="display:none">You have unsaved changes. Click <strong>Save</strong> to publish.</div>

  <div class="grid-2">
    <div class="panel"><h2>Hero Section</h2><p class="sub">The first thing visitors see</p><div style="display:grid;gap:.75rem">
      <?= tf('Badge text', 'hero', 'badge', $content['hero']['badge']) ?>
      <?= tf('Headline — lead', 'hero', 'titleLead', $content['hero']['titleLead']) ?>
      <?= tf('Headline — highlighted phrase (gold)', 'hero', 'titleHighlight', $content['hero']['titleHighlight']) ?>
      <?= tf('Headline — tail', 'hero', 'titleTail', $content['hero']['titleTail']) ?>
      <?= af('Subheading', 'hero', 'subheading', $content['hero']['subheading']) ?>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem">
        <?= tf('Primary button', 'hero', 'ctaPrimary', $content['hero']['ctaPrimary']) ?>
        <?= tf('Secondary button', 'hero', 'ctaSecondary', $content['hero']['ctaSecondary']) ?>
      </div>
    </div></div>

    <div class="panel"><h2>About Section</h2><p class="sub">Your company story</p><div style="display:grid;gap:.75rem">
      <?= tf('Eyebrow', 'about', 'eyebrow', $content['about']['eyebrow']) ?>
      <?= tf('Title', 'about', 'title', $content['about']['title']) ?>
      <?= af('Body', 'about', 'body', $content['about']['body']) ?>
      <?= tf('Experience badge (e.g. 3+)', 'about', 'experienceYears', $content['about']['experienceYears']) ?>
    </div></div>

    <div class="panel"><h2>Services Heading</h2><p class="sub">Intro above the services grid</p><div style="display:grid;gap:.75rem">
      <?= tf('Eyebrow', 'services', 'eyebrow', $content['services']['eyebrow']) ?>
      <?= tf('Title', 'services', 'title', $content['services']['title']) ?>
      <?= af('Description', 'services', 'description', $content['services']['description']) ?>
    </div></div>

    <div class="panel"><h2>Call-to-Action Band</h2><p class="sub">The closing banner</p><div style="display:grid;gap:.75rem">
      <?= tf('Title', 'cta', 'title', $content['cta']['title']) ?>
      <?= af('Description', 'cta', 'description', $content['cta']['description']) ?>
    </div></div>
  </div>
</div>
<?php require __DIR__ . '/includes/shell-bottom.php'; ?>
