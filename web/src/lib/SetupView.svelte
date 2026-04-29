<script lang="ts">
  import { TRACKER_GROUPS } from './trackers';

  let { selectedTrackers, onDone }: {
    selectedTrackers: Set<string>;
    onDone: (trackers: Set<string>) => void;
  } = $props();

  let selected = $state(new Set(selectedTrackers));

  function toggle(id: string) {
    if (selected.has(id)) selected.delete(id);
    else selected.add(id);
    selected = new Set(selected);
  }

  function getColor(id: string) {
    for (const g of TRACKER_GROUPS) {
      const it = g.items.find(i => i.id === id);
      if (it) return it.color;
    }
    return '#888';
  }
</script>

<div class="setup">
  <header>
    <h1>Logger</h1>
    <p class="tagline">Drop a log.</p>
  </header>

  <div class="card">
    <h2>What do you want to track?</h2>
    <p class="sub">Pick a handful. You can always change these later.</p>

    {#each TRACKER_GROUPS as group}
      <div class="group">
        <div class="group-label">{group.group}</div>
        <div class="chips">
          {#each group.items as item}
            {@const on = selected.has(item.id)}
            <button
              class="chip"
              class:selected={on}
              style:--dot-color={item.color}
              style:border-color={on ? item.color : ''}
              onclick={() => toggle(item.id)}
            >
              <span class="dot"></span>
              {item.label}
            </button>
          {/each}
        </div>
      </div>
    {/each}

    <div class="footer">
      <span class="count">{selected.size} selected</span>
      <button class="start-btn" disabled={selected.size === 0} onclick={() => onDone(selected)}>
        Open calendar →
      </button>
    </div>
  </div>
</div>

<style>
  .setup {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px 60px;
    background: var(--color-bg);
  }

  header {
    text-align: center;
    margin-bottom: 32px;
  }

  h1 {
    font-size: 36px;
    color: var(--color-forest);
    letter-spacing: 0.02em;
  }

  .tagline {
    font-size: 13px;
    color: var(--color-text-muted);
    margin-top: 2px;
    font-style: italic;
  }

  .card {
    width: 100%;
    max-width: 560px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 28px 28px 24px;
  }

  h2 {
    font-size: 18px;
    margin-bottom: 4px;
  }

  .sub {
    font-size: 13px;
    color: var(--color-text-secondary);
    margin-bottom: 24px;
  }

  .group {
    margin-bottom: 18px;
  }

  .group-label {
    font-size: 10px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--color-text-muted);
    margin-bottom: 8px;
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
  }

  .chip {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    border: 1px solid var(--color-border);
    border-radius: 20px;
    background: none;
    font-size: 12px;
    color: var(--color-text-secondary);
    transition: border-color 0.1s, color 0.1s;
  }

  .chip:hover {
    border-color: var(--color-border);
    background: var(--color-bg-secondary);
  }

  .chip.selected {
    color: var(--color-text);
    font-weight: 500;
    border-width: 1.5px;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--dot-color);
    flex-shrink: 0;
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid var(--color-border-light);
  }

  .count {
    font-size: 12px;
    color: var(--color-text-muted);
  }

  .start-btn {
    background: var(--color-forest);
    color: var(--color-cream);
    border: none;
    border-radius: var(--radius-md);
    padding: 8px 20px;
    font-size: 13px;
    font-weight: 500;
    transition: background 0.15s;
  }

  .start-btn:hover:not(:disabled) {
    background: var(--color-forest-light);
  }

  .start-btn:disabled {
    opacity: 0.4;
    cursor: default;
  }
</style>
