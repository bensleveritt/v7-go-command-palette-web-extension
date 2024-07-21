<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { fade, fly } from "svelte/transition";
  import { createProject, listSuggestions } from "../api";

  const open = writable(false);
  let input = "";

  onMount(() => {
    document.addEventListener("keydown", handleKeydown);
  });

  const commands = [
    { label: "New project", fn: createProject },
    { label: "Start chat", fn: createProject },
    { label: "Navigate to row", fn: createProject },
    { label: "Export project", fn: createProject },
    { label: "Add property", fn: createProject },
  ];

  // TODO: Test
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) handleOpen();
    if ($open && e.key === "Escape") handleEscape();
    if ($open && (e.key === "ArrowUp" || e.key === "ArrowDown"))
      handleNavigation();
  }

  // TODO: Test
  function handleOpen() {
    open.set(!$open);
  }

  // TODO: Test
  function handleEscape() {
    // Clear input if it's not empty
    if (input !== "") {
      input = "";
      return;
    }

    // Else close the dialog
    open.set(false);
  }

  function handleNavigation() {
    console.log("Navigating");
  }

  function onInput() {
    console.log(input);
    console.log("List suggestions");
    console.log(listSuggestions(input, "123", "456"));
  }
</script>

{#if $open}
  <div
    class="dialog-wrapper fixed inset-0 backdrop-blur-xl"
    aria-modal="true"
    role="dialog"
    aria-labelledby="dialogTitle"
    transition:fade={{ duration: 200 }}
  >
    <dialog
      class="shadow-lg rounded-corner-8 flex flex-col"
      open
      transition:fly={{ y: 20, duration: 200 }}
      aria-label="Command Palette"
    >
      <header class="w-full p-1">
        <div
          class="flex bg-background-gray-subtlest rounded-corner-8 px-1.5 py-1 bg-background-transparent hover:[&amp;:not(:disabled)]:bg-background-transparent-hovered w-full"
        >
          <input
            type="text"
            on:input={onInput}
            class="w-full bg-background-transparent px-1 py-0.5 text-sm-12px-default text-text transition-colors placeholder:text-text-subtlest aria-readonly:cursor-pointer focus:outline-none disabled:cursor-not-allowed disabled:text-text-disabled disabled:placeholder:text-text-disabled"
            autofocus
            placeholder="Type a command or search..."
            aria-label="Search"
          />
        </div>
      </header>

      <div
        role="separator"
        aria-orientation="horizontal"
        class="flex items-center justify-center gap-2 w-full w-full"
      >
        <div
          class="rounded-corner-1 bg-background-border-subtle h-px w-full"
        ></div>
      </div>

      <ul class="w-full p-1" role="menu">
        {#each commands as command}
          <li role="menuitem">
            <button on:click={() => command.fn()} class="command w-full"
              >{command.label}</button
            >
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
    margin: auto;
    position: fixed;
    width: 320px;
  }

  li {
    display: flex;
    justify-content: flex-start;
  }

  button.command:hover,
  button.command:focus {
    background-color: var(--color-background-transparent-hovered);
  }
</style>
