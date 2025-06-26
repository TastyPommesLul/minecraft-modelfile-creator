<script lang="ts">
    import {genDirs, genFiles} from "$lib";

    let type = $state("generated");
    let modelName = $state("");
    let nameSpace = $state("");
    let visible = $state(false);

    async function generate() {
        try {
            modelName = modelName.replace('.json', '');
            await genFiles(nameSpace, modelName, type);
        } catch (e) {
            console.error("Error:", e);
        }
    }
</script>

<style lang="scss">
  .container {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #type, #input, #dir, #generate {
    all: unset;
    background-color: #4a3375;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #4a3375;
    &:focus {
      outline: none;
      border: 1px solid #604196;
    }
  }
  #generate {
    padding: 10px;
  }
  label {
    margin-bottom: 15px;
    cursor: text;
    text-align: center;
  }

  label, p {
    color: darkgray;
  }
  .help {
    all: unset;
    position: absolute;
    top: 0;
    left: 12.5px;
    cursor: pointer;
  }
  .help-section {
    position: absolute;
    width: 50%;
    padding: 0 10px 0 30px;
    top: 25%;
    left: 20%;
    background-color: #4a3375;
    border-radius: 5px;
  }
</style>

<button class="help" onclick={() => visible =! visible}><p>Help!</p></button>
{#if visible}
  <div class="help-section">
    <p>For the item models to work in the game, you need to add a texture manually by going into <code>"documents/minecraft-models-creator/&lt;namespace&gt;textures/item"</code> and put a file named <code>"&lt;model_name&gt;.png"</code></p>
  </div>
{/if}
<main class="container" onclick={() => visible = false}>
  <label for="dir">The namespace for the Model(s)
    <br>(example: ruby_pack)</label>
  <input id="dir" type="text" bind:value={nameSpace} placeholder="Namespace...">
  <br /> <br />
  <label for="type">Select the type of Model to be Generated!</label>
  <select id="type" bind:value={type}>
    <option value="generated">Generated (2D)</option>
    <option value="handheld">Handheld (Like Tools)</option>
  </select>
  <br /> <br />
  <label for="input">Type the name for the Model you're making!
    <br>(just the name, no file extensions)
    <br>(example: ruby_sword)</label>
  <input id="input" type="text" bind:value={modelName} placeholder="Model Name..." >
  <br /> <br />
  <button id="generate" onclick={generate}>Generate Files</button>
</main>

