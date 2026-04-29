<script lang="ts">
  import { getTracker } from './trackers';

  let { selectedTrackers, onEditTrackers }: {
    selectedTrackers: Set<string>;
    onEditTrackers: () => void;
  } = $props();

  const CELL_H = 44;

  // Week starting Sunday
  const today = new Date();
  const dayOfWeek = today.getDay();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - dayOfWeek);

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d;
  });

  const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const MONTH_NAMES = ['January','February','March','April','May','June',
    'July','August','September','October','November','December'];

  const monthLabel = `${MONTH_NAMES[today.getMonth()]} ${today.getFullYear()}`;

  // Sample events — day 0 = Sunday of current week
  const SAMPLE_EVENTS = [
    { day: 0, sh: 22.5, dur: 1.5, id: 'sleep',    title: 'Sleep',       sub: '10:30p →' },
    { day: 1, sh: 0,    dur: 6,   id: 'sleep',    title: 'Sleep',       sub: 'cont.' },
    { day: 1, sh: 6,    dur: 1,   id: 'workout',  title: 'Morning run', sub: '5k · 28 min' },
    { day: 1, sh: 7.5,  dur: 0.5, id: 'meals',    title: 'Breakfast',   sub: 'Oats, eggs' },
    { day: 1, sh: 12,   dur: 0.5, id: 'meals',    title: 'Lunch',       sub: 'Salad' },
    { day: 1, sh: 19,   dur: 0.5, id: 'meals',    title: 'Dinner',      sub: 'Pasta' },
    { day: 1, sh: 22,   dur: 1.5, id: 'sleep',    title: 'Sleep',       sub: '10p →' },
    { day: 2, sh: 0,    dur: 5.5, id: 'sleep',    title: 'Sleep',       sub: 'cont.' },
    { day: 2, sh: 5.5,  dur: 1.25,id: 'workout',  title: 'Strength',    sub: 'Upper · 45m' },
    { day: 2, sh: 8,    dur: 0.5, id: 'meals',    title: 'Breakfast',   sub: 'Smoothie' },
    { day: 2, sh: 12.5, dur: 0.5, id: 'meals',    title: 'Lunch',       sub: 'Soup' },
    { day: 2, sh: 19,   dur: 0.5, id: 'meals',    title: 'Dinner',      sub: 'Stir fry' },
    { day: 2, sh: 22.5, dur: 1.5, id: 'sleep',    title: 'Sleep',       sub: '10:30p →' },
    { day: 3, sh: 0,    dur: 6,   id: 'sleep',    title: 'Sleep',       sub: 'cont.' },
    { day: 3, sh: 6.5,  dur: 0.5, id: 'meals',    title: 'Breakfast',   sub: 'Yogurt' },
    { day: 3, sh: 7,    dur: 1,   id: 'workout',  title: 'Yoga',        sub: '60 min' },
    { day: 3, sh: 12,   dur: 0.5, id: 'meals',    title: 'Lunch',       sub: 'Grain bowl' },
    { day: 3, sh: 19,   dur: 0.5, id: 'meals',    title: 'Dinner',      sub: 'Salmon' },
    { day: 3, sh: 22,   dur: 2,   id: 'sleep',    title: 'Sleep',       sub: '10p →' },
    { day: 4, sh: 0,    dur: 6,   id: 'sleep',    title: 'Sleep',       sub: 'cont.' },
    { day: 4, sh: 6,    dur: 1,   id: 'workout',  title: 'Bike ride',   sub: '12 mi · 55m' },
    { day: 4, sh: 7.5,  dur: 0.5, id: 'meals',    title: 'Breakfast',   sub: 'Eggs' },
    { day: 4, sh: 12.5, dur: 0.5, id: 'meals',    title: 'Lunch',       sub: 'Tacos' },
    { day: 5, sh: 0,    dur: 7,   id: 'sleep',    title: 'Sleep',       sub: 'midnight → 7a' },
    { day: 5, sh: 8,    dur: 0.5, id: 'meals',    title: 'Breakfast',   sub: 'Pancakes' },
    { day: 5, sh: 10,   dur: 1.5, id: 'workout',  title: 'Long run',    sub: '8 mi' },
    { day: 6, sh: 23,   dur: 1,   id: 'sleep',    title: 'Sleep',       sub: '11p →' },
  ];

  const hours = Array.from({ length: 24 }, (_, i) => i);

  function hourLabel(h: number) {
    if (h === 0) return '';
    if (h < 12) return `${h} AM`;
    if (h === 12) return '12 PM';
    return `${h - 12} PM`;
  }

  const WEEK_STATS: Record<string, { label: string; value: string }> = {
    sleep:    { label: 'Sleep avg',    value: '7h 12m' },
    workout:  { label: 'Workouts',     value: '4 / 5' },
    meals:    { label: 'Meals logged', value: '18 / 21' },
    hydration:{ label: 'Hydration',   value: '6 cups/day' },
    mood:     { label: 'Mood avg',     value: 'Good' },
    weight:   { label: 'Weight',       value: '172 lbs' },
  };

  function visibleEvents(day: number) {
    return SAMPLE_EVENTS.filter(e => e.day === day && selectedTrackers.has(e.id));
  }
</script>

<div class="cal-root">
  <!-- Topbar -->
  <div class="topbar">
    <div class="topbar-left">
      <h1 class="month-title">{monthLabel}</h1>
      <div class="nav-row">
        <button class="nav-btn">‹</button>
        <button class="nav-btn">Today</button>
        <button class="nav-btn">›</button>
      </div>
    </div>
    <div class="view-switcher">
      <button class="vbtn">Day</button>
      <button class="vbtn active">Week</button>
      <button class="vbtn">Month</button>
    </div>
    <div class="topbar-right">
      <button class="log-btn">+ Log event</button>
    </div>
  </div>

  <div class="body">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sb-section">
        <div class="sb-label">This week</div>
        {#each [...selectedTrackers] as id}
          {@const stat = WEEK_STATS[id]}
          {@const tracker = getTracker(id)}
          {#if stat && tracker}
            <div class="stat-row">
              <div class="stat-label">{stat.label}</div>
              <div class="stat-value">{stat.value}</div>
              <div class="stat-bar">
                <div class="stat-fill" style:background={tracker.color} style:width="70%"></div>
              </div>
            </div>
          {/if}
        {/each}
      </div>

      <div class="sb-section">
        <div class="sb-label">Event types</div>
        {#each [...selectedTrackers] as id}
          {@const tracker = getTracker(id)}
          {#if tracker}
            <div class="legend-row">
              <span class="legend-dot" style:background={tracker.color}></span>
              <span class="legend-name">{tracker.label}</span>
            </div>
          {/if}
        {/each}
      </div>

      <button class="edit-btn" onclick={onEditTrackers}>Edit trackers</button>
    </aside>

    <!-- Calendar -->
    <div class="cal-wrap">
      <!-- Day headers -->
      <div class="cal-header">
        <div class="corner"></div>
        {#each days as day, i}
          <div class="col-header">
            <div class="day-name">{DAY_NAMES[i]}</div>
            <div
              class="day-num"
              class:today={day.toDateString() === today.toDateString()}
            >{day.getDate()}</div>
          </div>
        {/each}
      </div>

      <!-- Time grid -->
      <div class="time-grid">
        <!-- Hour labels -->
        <div class="hour-labels">
          {#each hours as h}
            <div class="hour-label">{hourLabel(h)}</div>
          {/each}
        </div>

        <!-- Day columns -->
        {#each days as _day, di}
          <div class="day-col">
            {#each hours as _h}
              <div class="hour-cell"></div>
            {/each}
            {#each visibleEvents(di) as ev}
              {@const tracker = getTracker(ev.id)}
              {#if tracker}
                <div
                  class="event"
                  style:top="{ev.sh * CELL_H}px"
                  style:height="{Math.max(ev.dur * CELL_H - 2, 16)}px"
                  style:background={tracker.bg}
                  style:border-left-color={tracker.color}
                >
                  <div class="ev-title" style:color={tracker.textColor}>{ev.title}</div>
                  {#if ev.dur > 0.4}
                    <div class="ev-sub" style:color={tracker.textColor}>{ev.sub}</div>
                  {/if}
                </div>
              {/if}
            {/each}
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .cal-root {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: var(--color-bg);
  }

  /* Topbar */
  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 16px;
    border-bottom: 1px solid var(--color-border);
    background: var(--color-surface);
    flex-shrink: 0;
  }

  .topbar-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .month-title {
    font-size: 16px;
    font-family: var(--font-display);
    color: var(--color-forest);
  }

  .nav-row {
    display: flex;
    gap: 3px;
  }

  .nav-btn {
    background: none;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: 3px 10px;
    font-size: 12px;
    color: var(--color-text-secondary);
  }

  .nav-btn:hover {
    background: var(--color-bg-secondary);
  }

  .view-switcher {
    display: flex;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    overflow: hidden;
  }

  .vbtn {
    background: none;
    border: none;
    padding: 4px 13px;
    font-size: 12px;
    color: var(--color-text-secondary);
  }

  .vbtn.active {
    background: var(--color-bg-secondary);
    color: var(--color-text);
    font-weight: 500;
  }

  .log-btn {
    background: var(--color-forest);
    color: var(--color-cream);
    border: none;
    border-radius: var(--radius-md);
    padding: 5px 14px;
    font-size: 12px;
    font-weight: 500;
  }

  .log-btn:hover {
    background: var(--color-forest-light);
  }

  /* Body */
  .body {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  /* Sidebar */
  .sidebar {
    width: 180px;
    flex-shrink: 0;
    border-right: 1px solid var(--color-border);
    background: var(--color-surface);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  .sb-section {
    padding: 14px 14px 10px;
    border-bottom: 1px solid var(--color-border-light);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .sb-label {
    font-size: 10px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--color-text-muted);
  }

  .stat-row {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .stat-label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--color-text-muted);
  }

  .stat-value {
    font-size: 13px;
    font-weight: 500;
    color: var(--color-text);
  }

  .stat-bar {
    height: 3px;
    border-radius: 2px;
    background: var(--color-border);
    margin-top: 2px;
  }

  .stat-fill {
    height: 3px;
    border-radius: 2px;
  }

  .legend-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .legend-dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .legend-name {
    font-size: 12px;
    color: var(--color-text-secondary);
  }

  .edit-btn {
    margin: 12px 14px;
    background: none;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: 6px 10px;
    font-size: 12px;
    color: var(--color-text-secondary);
    text-align: center;
  }

  .edit-btn:hover {
    background: var(--color-bg-secondary);
  }

  /* Calendar */
  .cal-wrap {
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }

  .cal-header {
    display: grid;
    grid-template-columns: 48px repeat(7, 1fr);
    border-bottom: 1px solid var(--color-border);
    position: sticky;
    top: 0;
    background: var(--color-surface);
    z-index: 5;
    flex-shrink: 0;
  }

  .corner {
    border-right: 1px solid var(--color-border-light);
  }

  .col-header {
    text-align: center;
    padding: 8px 4px 6px;
    border-right: 1px solid var(--color-border-light);
  }

  .col-header:last-child {
    border-right: none;
  }

  .day-name {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-muted);
  }

  .day-num {
    font-size: 15px;
    font-weight: 500;
    color: var(--color-text);
    margin-top: 2px;
  }

  .day-num.today {
    width: 26px;
    height: 26px;
    background: var(--color-forest);
    color: var(--color-cream);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2px auto 0;
    font-size: 13px;
  }

  /* Time grid */
  .time-grid {
    display: grid;
    grid-template-columns: 48px repeat(7, 1fr);
    flex: 1;
  }

  .hour-labels {
    border-right: 1px solid var(--color-border-light);
  }

  .hour-label {
    height: 44px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 2px 6px 0 0;
    font-size: 9px;
    color: var(--color-text-muted);
    position: relative;
    top: -6px;
  }

  .day-col {
    border-right: 1px solid var(--color-border-light);
    position: relative;
  }

  .day-col:last-child {
    border-right: none;
  }

  .hour-cell {
    height: 44px;
    border-bottom: 1px solid var(--color-border-light);
  }

  /* Events */
  .event {
    position: absolute;
    left: 2px;
    right: 2px;
    border-radius: var(--radius-sm);
    border-left: 3px solid transparent;
    padding: 2px 5px;
    overflow: hidden;
    cursor: pointer;
  }

  .event:hover {
    opacity: 0.85;
  }

  .ev-title {
    font-size: 10px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .ev-sub {
    font-size: 9px;
    opacity: 0.8;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
