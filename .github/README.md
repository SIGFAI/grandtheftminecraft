# GrandTheftMinecraft

Minecraft creative mode in GTA V story mode: build with 630+ blocks, blow up cars with TNT and set Minecraft mobs on Los Santos.

**GrandTheftMinecraft is made by [cyteon](https://github.com/cyteon).** All credit for the mod goes to them.

- Original project: https://github.com/cyteon/GrandTheftMinecraft
- Report bugs and ask questions there: https://github.com/cyteon/GrandTheftMinecraft/issues
- Upstream release packaged here: [v1.5.0](https://github.com/cyteon/GrandTheftMinecraft/releases/tag/v1.5.0) (commit [`f7b3be4`](https://github.com/cyteon/GrandTheftMinecraft/tree/f7b3be4dddee724155e75ce995ba7693631d75c9))

> **Beta.** Nobody at SIGF has played this build yet. Back up your saves.
> Bugs in the mod itself go to the author's issue tracker above; problems with the one-click install go to this repository's issues.

## What you need

- **GTA V Legacy** ([Steam](https://store.steampowered.com/app/271590/)): GTA V Legacy (GTA5.exe), any build ScriptHookV supports; Enhanced is not supported.
- **Minecraft** (textures, font and sounds of Minecraft Java 1.21.11, read from the player's own install or downloaded from Mojang's servers on first launch; Minecraft is not launched).
- scripthookv: ScriptHookV for your GTA V Legacy build: copy ScriptHookV.dll and dinput8.dll from its bin folder into the GTA V folder (https://www.dev-c.com/gtav/scripthookv/).
- openiv-asi: optional, for textured blocks, Steve and mobs: OpenIV > Tools > ASI Manager > OpenIV.asi, then add <Item>dlcpacks:/gtm/</Item> to mods\update\update.rpf\common\data\dlclist.xml (https://openiv.com/).
- Windows and the [SIGF app](https://sigf.ai).

## Install

In the SIGF app, open **GrandTheftMinecraft** in the catalog, press **Install**, then **Play**. **Restore** puts your game folders back exactly as they were.
The app follows `mashup.json` in this repository: every download is pinned by sha256. The files come from the release [`v1.5.0`](../../releases/tag/v1.5.0).

### How to play

- GTA V story mode with Minecraft's hotbar, creative inventory, blocks and items: build anywhere in Los Santos, light TNT, throw ender pearls, shoot arrows.
- Press Play and load story mode. The first time, the top-left corner shows the setup (Minecraft textures and sounds); then restart GTA once when it asks.
- F6 turns Minecraft mode on and off, E opens the creative inventory, 1-9 or the wheel pick a hotbar slot, double-tap Space to fly.
- Left mouse breaks or hits, right mouse places or uses, middle mouse picks the block you look at. In a car, GTA's driving controls are unchanged.
- Spawn eggs bring zombies, skeletons, creepers and more that fight GTA's people; build a Wither or golems like in Minecraft.

### Good to know

- You need GTA V Legacy (GTA5.exe, not Enhanced) and ScriptHookV for your game build: copy ScriptHookV.dll and dinput8.dll from its bin folder into the GTA V folder. Story mode only, never GTA Online: BattlEye stays off while installed.
- No Minecraft files are shipped: on first launch the mod reads Minecraft Java 1.21.11 from your own launcher, or downloads the official files from Mojang (internet needed once). Made for players who own Minecraft: Java Edition.
- Optional, for textured lit blocks, Steve and mobs: install OpenIV.asi (OpenIV > Tools > ASI Manager), then in OpenIV add <Item>dlcpacks:/gtm/</Item> to mods\update\update.rpf\common\data\dlclist.xml. Without it, blocks are drawn flat.
- Restore removes the mod; it asks to confirm because the mod writes its textures into its own block pack. The GrandTheftMinecraft folder keeps your config, builds and the Minecraft files it made: delete it by hand.
- Beta: report bugs to the author with the Report a bug link, with GrandTheftMinecraft\gtm.log.

## No Minecraft or GTA files

The mod ships no Minecraft and no GTA content. On first launch it builds Minecraft's textures, font and sounds from the player's own Minecraft Java 1.21.11, or downloads the official files from Mojang's servers (SHA1-checked). The block pack holds generic cube meshes with blank textures that the mod fills on the player's PC.

## What this repository holds

1. The upstream source tree at tag `v1.5.0`, commit [`f7b3be4dddee724155e75ce995ba7693631d75c9`](https://github.com/cyteon/GrandTheftMinecraft/tree/f7b3be4dddee724155e75ce995ba7693631d75c9), every file unchanged (same git blobs), except upstream's GitHub Actions workflow (`.github/workflows/release.yml`, which builds the release; see it upstream). Upstream's own `README.md` is there, unchanged; GitHub shows this file (`.github/README.md`) first.
2. Added by SIGF in the same commit: this file, and `sigf/` (the scripts that built the release assets, for reference: they run inside the SIGF repository).
3. `mashup.json`, the SIGF app recipe (the next commit).
4. The release `v1.5.0` (its tag is the first commit):

| Asset | Size | sha256 | What it is |
|---|---|---|---|
| `grandtheftminecraft-gta5.zip` | 5046399 B | `26eaa63f54c81640cd9f4ab8ed3e40b256b8d0f142a2846db6532999b37fa4e3` | upstream's release `v1.5.0` manual-install files, unchanged (built by upstream's GitHub Actions from the tag commit, with build-provenance attestations; `GrandTheftMinecraft.asi` sha256 `b205447a...2939`): the ASI, its five data files in `GrandTheftMinecraft/`, the block pack `mods/update/x64/dlcpacks/gtm/dlc.rpf` (generic meshes, blank textures), upstream's README, LICENSE and NOTICE under `GrandTheftMinecraft/docs/`, and our `args.txt` (`-nobattleye -noBE`, story mode); into the GTA V folder. |

The sha256 of every file inside the zips is in `mashup.json` (`contents`).

## Licenses

| Part | License | Where |
|---|---|---|
| GrandTheftMinecraft (all of the upstream tree and the release files) | MIT, Copyright 2026 cyteon; vendored miniaudio, stb (public domain / MIT), miniz (MIT) | `LICENSE`, `NOTICE.md` |

## Why this repository exists

The SIGF app (https://sigf.ai) installs mods from recipes (`mashup.json`) whose downloads are pinned release files. This repository makes GrandTheftMinecraft installable in one click, credited to cyteon. If you are the author and want anything changed or taken down, open an issue here.
