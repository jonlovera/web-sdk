<script lang="ts">
import { tweened } from 'svelte/motion';
import type { PixiPoint } from 'pixi-svelte';
import { App, Container, Graphics, Text } from 'pixi-svelte';
import { Button } from 'components-pixi';
import { UiSprite } from 'components-ui-pixi';
import { getContext, setContext } from '../game/context';
import config from '../game/config';

setContext();
const context = getContext();

const dartPos = tweened<PixiPoint>({ x: 0, y: config.boardRadius + 20 }, { duration: 400 });
let throws = 0;
let total = 0;
let lastScore = 0;
let gameOver = false;

function getScore(r: number) {
  for (const ring of config.rings) {
    if (r <= ring.radius) return ring.score;
  }
  return 0;
}

function throwDart() {
  if (gameOver) {
    throws = 0;
    total = 0;
    gameOver = false;
  }
  const angle = Math.random() * Math.PI * 2;
  const r = Math.random() * config.boardRadius;
  const target = { x: r * Math.cos(angle), y: r * Math.sin(angle) };
  dartPos.set({ x: 0, y: config.boardRadius + 20 });
  dartPos.set(target);
  lastScore = getScore(r);
  total += lastScore;
  throws += 1;
  context.eventEmitter.broadcast({ type: 'score', score: lastScore });
  if (throws === 3) {
    gameOver = true;
    context.eventEmitter.broadcast({ type: 'gameOver', total });
  }
}
</script>

<App>
  <Container x={200} y={200}>
    {#each [...config.rings].reverse() as ring (ring.radius)}
      <Graphics
        draw={(g) => {
          g.clear();
          g.beginFill(ring.color);
          g.drawCircle(0, 0, ring.radius);
          g.endFill();
        }}
      />
    {/each}
    <Graphics
      {...$dartPos}
      draw={(g) => {
        g.clear();
        g.beginFill(0xffff00);
        g.drawCircle(0, 0, 5);
        g.endFill();
      }}
    />
  </Container>
  <Container x={200} y={400}>
    <Button onpress={throwDart} sizes={{ width: 120, height: 50 }}>
      {#snippet children({ center })}
        <UiSprite {...center} width={120} height={50} backgroundColor={0x333333} />
        <Text {...center} anchor={0.5} text={gameOver ? 'Restart' : 'Throw'} style={{ fill: 0xffffff }} />
      {/snippet}
    </Button>
    <Text y={60} text={`Total: ${total}`} style={{ fill: 0xffffff }} />
    {#if !gameOver}
      <Text y={90} text={`Last: ${lastScore}`} style={{ fill: 0xffffff }} />
    {/if}
    {#if gameOver}
      <Text y={90} text="Game Over" style={{ fill: 0xff0000 }} />
    {/if}
  </Container>
</App>
