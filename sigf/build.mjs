// GrandTheftMinecraft (cyteon, MIT): Minecraft creative mode inside GTA V Legacy story mode. A ScriptHookV ASI
// (C++) with Minecraft's HUD, creative inventory, 630+ blocks, items, Steve and mobs, plus an add-on DLC pack
// (dlc.rpf) of generic block models with blank textures. On first launch the ASI builds Minecraft's textures and
// sounds from the player's own Minecraft Java 1.21.11 or from Mojang's servers (SHA1-checked), and fills the pack's
// textures at the next start. Nothing from Minecraft or GTA is shipped.
//
// Rehosted on SIGFAI/grandtheftminecraft: upstream's manual-install zip v1.5.0 (built by upstream's GitHub Actions
// from the tag commit, attested), every file unchanged, repacked into one zip unpacked into {game}: the ASI, its data
// folder, the DLC pack at the path the .oiv package uses (mods\update\x64\dlcpacks\gtm\dlc.rpf), upstream's README,
// LICENSE and NOTICE moved under GrandTheftMinecraft\docs\, and args.txt (story mode, BattlEye off) like the other
// GTA V library recipes. The .oiv's last step (one <Item>dlcpacks:/gtm/</Item> line inside an RPF archive) is not
// something the app can do: the player does it in OpenIV (card note). Without it the mod still runs (invisible crate
// collision + polygon blocks).
//   node library/grandtheftminecraft/build.mjs       (outputs: library/lib.mjs)
import { unzip } from '../../orchestrator/src/recipe.js';
import { card, dl, emit, pinned, player, zipAsset } from '../lib.mjs';

const UP = {
  repo: 'https://github.com/cyteon/GrandTheftMinecraft', tag: 'v1.5.0', commit: 'f7b3be4dddee724155e75ce995ba7693631d75c9',
  license: 'MIT', authors: ['cyteon'],
  zip: { file: 'GrandTheftMinecraft-1.5.0-manual.zip', sha256: 'eed1d5060c99d3def71a73a5f51e9f5e63d0ca0798da8bc574463f49975d831e' }, // = GitHub digest, 2026-10-07
  asi: 'b205447a069c42d1b8a1b74b4a5382ea7e99561031b2f599cb79281c13672939', // attested (gh attestation verify), run 37522107398
};
const ID = 'grandtheftminecraft', VERSION = '1.5.0', NAME = 'GrandTheftMinecraft';
const TAGLINE = 'Minecraft creative mode in GTA V story mode: build with 630+ blocks, TNT cars, throw ender pearls and set mobs on Los Santos.';
const ARGS = '-nobattleye -noBE';

const up = new Map(unzip(await pinned(`${UP.repo}/releases/download/${UP.tag}/${UP.zip.file}`, UP.zip.sha256)).map(e => [e.name.replace(/\\/g, '/'), e.data]));
const DATA = ['defs.txt', 'dlc_tex.txt', 'icons.txt', 'rigs.txt', 'shapes.txt'].map(f => `GrandTheftMinecraft/${f}`);
const RPF = 'mods/update/x64/dlcpacks/gtm/dlc.rpf';
for (const f of ['GrandTheftMinecraft.asi', ...DATA, RPF, 'README.md', 'LICENSE', 'NOTICE.md']) if (!up.has(f)) throw new Error(`${UP.zip.file} has no ${f}`);
const gta = zipAsset(`${ID}-gta5.zip`, [
  { name: 'GrandTheftMinecraft.asi', data: up.get('GrandTheftMinecraft.asi') },
  ...DATA.map(f => ({ name: f, data: up.get(f) })),
  { name: RPF, data: up.get(RPF) },
  { name: 'GrandTheftMinecraft/docs/README.md', data: up.get('README.md') },
  { name: 'GrandTheftMinecraft/docs/LICENSE', data: up.get('LICENSE') },
  { name: 'GrandTheftMinecraft/docs/NOTICE.md', data: up.get('NOTICE.md') },
  { name: 'args.txt', data: Buffer.from(ARGS) },
]);
if (!gta.contents.some(c => c.path === 'GrandTheftMinecraft.asi' && c.sha256 === UP.asi)) throw new Error('GrandTheftMinecraft.asi differs from the attested build');
const assets = [gta];

const make = (urls, set) => ({
  id: `sigf/${ID}`,
  version: VERSION,
  name: NAME,
  tagline: player(ID).tagline ?? TAGLINE,
  how_to_play: player(ID).howToPlay,
  kind: 'mashup', // Minecraft never runs: its textures and sounds are read from the player's install (or Mojang's servers)
  games: [
    { game: 'gta5', role: 'host', label: 'GTA V Legacy', engine: 'GTA V Legacy (RAGE, story mode) + ScriptHookV ASI GrandTheftMinecraft (C++) + add-on DLC pack', apps: { steam: '271590' }, runtime: 'GTA V Legacy (GTA5.exe), any build ScriptHookV supports; Enhanced is not supported' },
    { game: 'minecraft', role: 'guest', label: 'Minecraft', uses: 'textures, font and sounds of Minecraft Java 1.21.11, read from the player\'s own install or downloaded from Mojang\'s servers on first launch; Minecraft is not launched' },
  ],
  requires: [
    { id: 'scripthookv', page: 'https://www.dev-c.com/gtav/scripthookv/', license: 'Alexander Blade: free, not redistributable',
      note: 'ScriptHookV for your GTA V Legacy build: copy ScriptHookV.dll and dinput8.dll from its bin folder into the GTA V folder' },
    { id: 'openiv-asi', page: 'https://openiv.com/', license: 'OpenIV team: free, not redistributable',
      note: 'optional, for textured blocks, Steve and mobs: OpenIV > Tools > ASI Manager > OpenIV.asi, then add <Item>dlcpacks:/gtm/</Item> to mods\\update\\update.rpf\\common\\data\\dlclist.xml' },
  ],
  // Checked by the app before install and Play (SIGF app 0.1.2+): no GTA start without ScriptHookV.
  requires_files: [{ id: 'scripthookv', game: 'gta5', path: '{game}/ScriptHookV.dll', message: 'Install Script Hook V for your GTA V build first', page: 'https://www.dev-c.com/gtav/scripthookv/' }],
  install: [
    { game: 'gta5', strategy: 'game-dir-snapshot', files: [
      { src: gta.name, dst: '{game}', unpack: true, contents: gta.contents, ...dl(gta, urls) },
    ] },
  ],
  launch: [{ game: 'gta5', args: [] }],
  files: set.map(a => ({ name: a.name, ...dl(a, urls) })),
  source: {
    repo: UP.repo, license: UP.license, upstream_license: UP.license, tag: UP.tag, commit: UP.commit,
    hosted: `https://github.com/SIGFAI/${ID}`,
  },
  media: {},
  built_by: { author: UP.authors[0], authors: UP.authors, packaged_by: 'SIGF' },
  idea_by: UP.authors[0],
  built_at: '2026-10-07T00:00:00.000Z',
  // Never installed together (the app refuses either order): the same args.txt in the GTA V folder.
  conflicts: ['sigf/um-gta5-passthrough', 'sigf/witherstorm-gta5', 'sigf/mc-in-gta-enhanced'],
  ...card(UP.repo),
  notes: player(ID).notes,
});

emit({ slug: ID, version: VERSION, assets, fixtureAssets: null, make });
