import {BaseDirectory, create, exists, mkdir, remove, writeTextFile} from "@tauri-apps/plugin-fs";
import {ask} from "@tauri-apps/plugin-dialog";

const name = "minecraft-models-creator"

export async function genDirs(nameSpace: string): Promise<void> {
    let nameSpaceExists = await exists(`${name}/${nameSpace}`, { baseDir: BaseDirectory.Document })
    let textureExists = await exists(`${name}/${nameSpace}/textures`, { baseDir: BaseDirectory.Document })
    let modelExists = await exists(`${name}/${nameSpace}/models`, { baseDir: BaseDirectory.Document })
    let itemExists = await exists(`${name}/${nameSpace}/items`, { baseDir: BaseDirectory.Document })
    let itemModelExists = await exists(`${name}/${nameSpace}/models/item`, { baseDir: BaseDirectory.Document })
    let itemTextureExists = await exists(`${name}/${nameSpace}/textures/item`, { baseDir: BaseDirectory.Document })
    if (!nameSpaceExists) {
        await mkdir(`${name}/${nameSpace}`, { baseDir: BaseDirectory.Document })
    }
    if (!textureExists) {
        await mkdir(`${name}/${nameSpace}/textures`, { baseDir: BaseDirectory.Document })
    }
    if (!modelExists) {
        await mkdir(`${name}/${nameSpace}/models`, { baseDir: BaseDirectory.Document })
    }
    if (!itemExists) {
        await mkdir(`${name}/${nameSpace}/items`, { baseDir: BaseDirectory.Document })
    }
    if (!itemModelExists) {
        await mkdir(`${name}/${nameSpace}/models/item`, { baseDir: BaseDirectory.Document })
    }
    if (!itemTextureExists) {
        await mkdir(`${name}/${nameSpace}/textures/item`, { baseDir: BaseDirectory.Document })
    }
}

export async function genFiles(nameSpace: string, modelName: string, type: string) {
    if (nameSpace == "") {
        alert("Namespace can't be empty!")
        return
    }
    if (modelName == "") {
        alert("Model name can't be empty!")
        return
    }
    await genDirs(nameSpace)
    let existsItemModel = await exists(`minecraft-models-creator/${nameSpace}/models/item/${modelName}.json`, { baseDir: BaseDirectory.Document })
    let existsModel = await exists(`minecraft-models-creator/${nameSpace}/items/${modelName}.json`, { baseDir: BaseDirectory.Document })

    if (!existsModel || !existsItemModel) {
    let file1 = await create(`${name}/${nameSpace}/models/item/${modelName}.json`, { baseDir: BaseDirectory.Document })
    let file2 = await create(`${name}/${nameSpace}/items/${modelName}.json`, { baseDir: BaseDirectory.Document })
        await file1.write(new TextEncoder().encode(`{
  "parent": "minecraft:item/${type}",
  "textures": {
    "layer0": "${nameSpace}:item/${modelName}"
  }
}`))
        await file2.write(new TextEncoder().encode(`{
  "model": {
    "type": "minecraft:model",
    "model": "${nameSpace}:item/${modelName}"
  }
}`))
        await file1.close()
        await file2.close()
    } else if (existsModel || existsItemModel) {
        let answer = await ask("A file with that name already exists.\ndo you want to Override it?", {
            title: "Override file?",
            kind: "warning"
        })
        if (answer) {
            try {
                await remove(`${name}/${nameSpace}/models/item/${modelName}.json`, { baseDir: BaseDirectory.Document })
                await remove(`${name}/${nameSpace}/items/${modelName}.json`, { baseDir: BaseDirectory.Document })
            } catch (e) {
                console.error("Error: " + e)
            }
            let file1 = await create(`${name}/${nameSpace}/models/item/${modelName}.json`, { baseDir: BaseDirectory.Document })
            let file2 = await create(`${name}/${nameSpace}/items/${modelName}.json`, { baseDir: BaseDirectory.Document })
            await file1.write(new TextEncoder().encode(`{
  "parent": "minecraft:item/${type}",
  "textures": {
    "layer0": "${nameSpace}:item/${modelName}"
  }
}`))
            await file2.write(new TextEncoder().encode(`{
  "model": {
    "type": "minecraft:model",
    "model": "${nameSpace}:item/${modelName}"
  }
}`))
            await file1.close()
            await file2.close()
        } else {
            alert("File wasn't overriden!");
        }
    }
}