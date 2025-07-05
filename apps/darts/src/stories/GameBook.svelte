<script lang="ts" module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  const { Story } = defineMeta({ title: 'darts/Game' });
</script>

<script lang="ts">
  import { StoryPixiApp } from 'components-storybook';
  import Game from '../components/Game.svelte';
  import { setContext } from '../game/context';
  setContext();
</script>

<Story name="default">
  {#snippet template()}
    <StoryPixiApp assets={{}}>
      <Game />
    </StoryPixiApp>
  {/snippet}
</Story>
