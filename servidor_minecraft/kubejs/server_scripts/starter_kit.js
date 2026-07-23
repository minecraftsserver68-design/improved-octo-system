// ============================================================
// KIT INICIAL - TACZ + LRArmor
// Archivo: kubejs/server_scripts/starter_kit.js
// ============================================================

// -------------------- ARMAS POR RAREZA --------------------

const WEAPON_TABLE = [
  {
    chance: 55,
    items: [
      'tacz:glock_17',
      'tacz:m1911',
      'tacz:cz75',
      'tacz:p320',
      'tacz:b93r'
    ]
  },
  {
    chance: 25,
    items: [
      'tacz:uzi',
      'tacz:ump45',
      'tacz:hk_mp5a5'
    ]
  },
  {
    chance: 12,
    items: [
      'tacz:vector45',
      'tacz:p90'
    ]
  },
  {
    chance: 6,
    items: [
      'tacz:ak47',
      'tacz:m16a1',
      'tacz:type_81'
    ]
  },
  {
    chance: 2,
    items: [
      'tacz:scar_l',
      'tacz:hk416d'
    ]
  }
]

// -------------------- MUNICIÓN --------------------

const AMMO_BY_WEAPON = {
  'tacz:glock_17': 'tacz:9mm',
  'tacz:m1911': 'tacz:45acp',
  'tacz:cz75': 'tacz:9mm',
  'tacz:p320': 'tacz:45acp',
  'tacz:b93r': 'tacz:9mm',
  'tacz:uzi': 'tacz:9mm',
  'tacz:ump45': 'tacz:45acp',
  'tacz:hk_mp5a5': 'tacz:9mm',
  'tacz:vector45': 'tacz:45acp',
  'tacz:p90': 'tacz:57x28',
  'tacz:ak47': 'tacz:762x39',
  'tacz:m16a1': 'tacz:556x45',
  'tacz:type_81': 'tacz:762x39',
  'tacz:scar_l': 'tacz:556x45',
  'tacz:hk416d': 'tacz:556x45'
}

// -------------------- ARMADURA --------------------

const ARMOR_PIECES = [
  'lrarmor:atf_helmet',
  'lrarmor:atf_chestplate',
  'lrarmor:atf_leggings',
  'lrarmor:atf_boots',
  'lrarmor:attacker_helmet',
  'lrarmor:attacker_chestplate',
  'lrarmor:attacker_leggings',
  'lrarmor:defender_helmet',
  'lrarmor:defender_chestplate',
  'lrarmor:scout_helmet',
  'lrarmor:scout_chestplate',
  'lrarmor:sniper_helmet',
  'lrarmor:sniper_chestplate',
  'lrarmor:medical_helmet',
  'lrarmor:medical_boots',
  'lrarmor:fbi_helmet',
  'lrarmor:fbi_chestplate',
  'lrarmor:dea_helmet',
  'lrarmor:joker_helmet'
]

// -------------------- FUNCIONES --------------------

function rollWeapon() {
  const roll = Math.random() * 100
  let total = 0

  for (const tier of WEAPON_TABLE) {
    total += tier.chance
    if (roll <= total) {
      return tier.items[Math.floor(Math.random() * tier.items.length)]
    }
  }

  return WEAPON_TABLE[0].items[0]
}

function rollArmorPiece() {
  return ARMOR_PIECES[Math.floor(Math.random() * ARMOR_PIECES.length)]
}

// -------------------- EVENTO --------------------

PlayerEvents.loggedIn(event => {

  const player = event.player
  const data = player.persistentData

  if (data.getBoolean('recibio_kit_inicial')) {
    // Jugador recurrente: saludo personalizado con colores vivos

    player.runCommandSilent('title @s times 10 70 20')

    player.runCommandSilent(
      'title @s title ["",{"text":"✦ ","color":"aqua","bold":true},{"text":"BIENVENID@","color":"gold","bold":true,"italic":true},{"text":" ✦","color":"aqua","bold":true}]'
    )

    player.runCommandSilent(
      'title @s subtitle ["",{"text":"➤ ","color":"light_purple"},{"text":"' + player.name.getString() + '","color":"yellow","bold":true},{"text":" ➤","color":"light_purple"}]'
    )

    player.runCommandSilent(
      'playsound minecraft:entity.player.levelup master @s'
    )

    player.runCommandSilent(
      'particle minecraft:totem_of_undying ~ ~1 ~ 0.5 0.5 0.5 0.1 30'
    )

    return
  }

  data.putBoolean('recibio_kit_inicial', true)

  const weaponId = rollWeapon()
  const armorId = rollArmorPiece()
  const ammoId = AMMO_BY_WEAPON[weaponId] || 'tacz:9mm'

  // Arma
  player.give(
    Item.of(
      'tacz:modern_kinetic_gun',
      '{GunId:"' + weaponId + '"}'
    )
  )

  // Munición
  player.give(
    Item.of(
      'tacz:ammo',
      '{AmmoId:"' + ammoId + '"}'
    ).withCount(64)
  )

  player.give(
    Item.of(
      'tacz:ammo',
      '{AmmoId:"' + ammoId + '"}'
    ).withCount(64)
  )

  // Armadura
  player.give(Item.of(armorId))

  // Comida
  player.give(Item.of('minecraft:cooked_beef').withCount(16))

  // Título en el centro
  player.runCommandSilent('title @s times 10 60 20')

  player.runCommandSilent(
    'title @s title {"text":"¡BIENVENIDO!","color":"gold","bold":true}'
  )

  player.runCommandSilent(
    'title @s subtitle {"text":"Has recibido tu kit inicial","color":"green","italic":false}'
  )

  // Sonido
  player.runCommandSilent(
    'playsound minecraft:entity.player.levelup master @s'
  )
})