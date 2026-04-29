<script lang="ts">
  import SetupView from './lib/SetupView.svelte';
  import CalendarView from './lib/CalendarView.svelte';

  let view: 'setup' | 'calendar' = 'setup';
  let selectedTrackers: Set<string> = new Set(['sleep', 'workout', 'meals', 'hydration', 'mood', 'weight']);

  function onSetupDone(trackers: Set<string>) {
    selectedTrackers = trackers;
    view = 'calendar';
  }
</script>

<div id="app-root">
  {#if view === 'setup'}
    <SetupView {selectedTrackers} onDone={onSetupDone} />
  {:else}
    <CalendarView {selectedTrackers} onEditTrackers={() => view = 'setup'} />
  {/if}
</div>

<style>
  #app-root {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
