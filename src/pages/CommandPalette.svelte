<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { fade, fly } from "svelte/transition";

  const open = writable(false);

  onMount(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "k" && e.metaKey) {
        open.set(!$open);
      }
    });
  });

  const commands = [
    "New project",
    "Start chat",
    "Navigate to row",
    "Export project",
    "Add property",
  ];
</script>

{#if $open}
  <div
    class="dialog-wrapper fixed inset-0 backdrop-blur-xl"
    aria-modal="true"
    role="dialog"
    aria-labelledby="dialogTitle"
    transition:fade={{ duration: 200 }}
  >
    <dialog class="shadow-lg" open transition:fly={{ y: 20, duration: 200 }}>
      <header>
        <h2 id="dialogTitle">Command Palette</h2>
        <input type="text" />
        <button on:click={() => open.set(false)}>Close</button>
      </header>

      <ul>
        {#each commands as command}
          <li>
            <button on:click={() => console.log(command)}>{command}</button>
          </li>
        {/each}
      </ul>
    </dialog>
  </div>
{/if}

<style>
  .dialog-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.06);
    backdrop-filter: blur(4px);
    z-index: 2147483001; /* 1 more than intercom */
  }

  dialog {
    color: var(--color-text-default);
    background: var(--color-surface-default);
    border-radius: 8px;
    margin: auto;
    padding: 1rem;
    position: fixed;
  }
</style>
