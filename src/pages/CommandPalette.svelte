<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  const open = writable(false);
  let dialogEl: HTMLDialogElement;

  onMount(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "k" && e.metaKey) {
        if (dialogEl.open) {
          dialogEl.close();
        } else {
          dialogEl.showModal();
        }
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

<dialog bind:this={dialogEl} class="shadow-lg">
  <header>
    <input type="text" />
    <button on:click={() => open.set(false)}>Close</button>
  </header>

  <ul>
    {#each commands as command}
      <li><button on:click={() => console.log(command)}>{command}</button></li>
    {/each}
  </ul>
</dialog>

<style>
  dialog {
    color: var(--color-text-default);
    background: var(--color-surface-default);
    border-radius: 8px;
    margin: auto;
    padding: 1rem;
  }
</style>
