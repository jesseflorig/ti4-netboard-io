import { gamePhases, playerColors, playerFactions } from './data';

const GAMES_KEY = 'ti4-netboard-games';

export const initialPlayerMeta = {
  victoryPoints: 0,
};

// Add the game data to local storage games array
export const addGame = gameData => {
  const { localStorage } = window;
  const { id, players, victoryPointLimit, inactivityTimer, sets } = gameData;

  //Initialized data
  const startTime = Math.floor(Date.now() / 1000); // Start time in seconds
  const currentRound = 1;
  const currentPhase = gamePhases[0];

  const newGame = JSON.stringify({
    id,
    startTime,
    currentRound,
    currentPhase,
    players,
    victoryPointLimit: parseInt(victoryPointLimit),
    inactivityTimer,
    sets,
  });
  const storedGames = JSON.parse(localStorage.getItem(GAMES_KEY)) || [];
  const newStoredGames = JSON.stringify([...storedGames, newGame]);

  localStorage.setItem(GAMES_KEY, newStoredGames);
  return JSON.parse(newGame);
};

export const saveGames = saves => {
  const { localStorage } = window;
  localStorage.setItem(GAMES_KEY, JSON.stringify(saves));
};

// Compute faction preferred colors
export const adjustPreferredColors = (players, sets) => {
  const validColors = getSetColors(sets);
  let chosenColors = [];
  let backfill = [];

  const adjustedPlayers = players.map(currentPlayer => {
    let needsBackfill = true;
    // Get highest color not beaten by remaining factions
    const draftPlayer = currentPlayer;
    const currentColorMap = getFactionByName(currentPlayer.faction).colors;
    const remainingColorMaps = players
      .slice(currentPlayer.id)
      .map(player => getFactionByName(player.faction).colors);

    const currentColors = Object.keys(currentColorMap);
    let iterationsLeft = currentColors.length;
    for (const color of currentColors) {
      iterationsLeft -= 1;
      const isValid = validColors.includes(color);
      if (!isValid) {
        if (iterationsLeft === 0 && needsBackfill) backfill.push(currentPlayer);
        continue;
      }

      const targetMax = Math.max(
        ...extractProp([...remainingColorMaps, { color: 0 }], color, 0)
      );
      const isMax = currentColorMap[color] > targetMax;
      const isTaken = chosenColors.includes(color);
      if (isMax && !isTaken) {
        needsBackfill = false;
        draftPlayer.color = color;
        chosenColors.push(color);
        break;
      }

      if (iterationsLeft === 0 && needsBackfill) backfill.push(currentPlayer);
    }
    return draftPlayer;
  });

  // Backfill players with no preferred options with available colors
  backfill.map(player => {
    const idx = player.id - 1;
    const nextColor = getNextItem(chosenColors, validColors);
    chosenColors.push(nextColor);
    adjustedPlayers[idx].color = nextColor;
    return true;
  });

  return adjustedPlayers;
};

export const capitalize = string => {
  return string[0].toUpperCase() + string.substring(1);
};

export const getFactionByName = factionName => {
  return playerFactions.filter(faction => faction.name === factionName)[0];
};

export const getSetColors = sets => {
  const setColors = filterItemsBySets(playerColors, sets);
  return extractProp(setColors, 'color');
};

export const getSetFactions = sets => {
  const setFactions = filterItemsBySets(playerFactions, sets);
  return extractProp(setFactions, 'shortName');
};

// Given an array of items and set names, return items that are in the set names
export const filterItemsBySets = (items, sets = []) => {
  return items.filter(item => sets.includes(item.set));
};

export const genGameId = (length = 16) => {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// Given an array and prop name, return an array of the prop values
export const extractProp = (items, propName, defaultVal) => {
  return items.map(item => item[propName] || defaultVal);
};

// Given arrays A and B, return the next B item that isnt in A
export const getNextItem = (selectedItems = [], availableItems = []) => {
  if (selectedItems.length >= availableItems.length) {
    throw new Error('There are no colors left to choose from');
  }
  return availableItems.filter(color => !selectedItems.includes(color))[0];
};

// Given arrays A and B, return a random B item that isnt in A
export const getNextRandomItem = (selectedItems = [], availableItems = []) => {
  if (selectedItems.length >= availableItems.length) {
    throw new Error('There are no colors left to choose from');
  }
  const validItems = availableItems.filter(
    color => !selectedItems.includes(color)
  );
  const randomIndex = Math.floor(Math.random() * validItems.length);
  return validItems[randomIndex];
};

export const getNewPlayer = (currentPlayers = [], sets = []) => {
  const nextPlayerCount = currentPlayers.length + 1;

  const currentColors = extractProp(currentPlayers, 'color');
  const validColors = extractProp(
    filterItemsBySets(playerColors, sets),
    'color'
  );
  const nextColor = getNextItem(currentColors, validColors);

  const currentFactions = extractProp(currentPlayers, 'faction');
  const validFactions = extractProp(
    filterItemsBySets(playerFactions, sets),
    'name'
  );
  const nextFaction = getNextRandomItem(currentFactions, validFactions);

  return {
    id: nextPlayerCount,
    color: nextColor,
    faction: nextFaction,
    ...initialPlayerMeta,
  };
};

export const hashString = string => {
  return string.split('').reduce(function (current, next) {
    current = (current << 5) - current + next.charCodeAt(0);
    return current & current;
  }, 0);
};

// Load game save strings from localStorage
export const loadGameSaves = () => {
  const { localStorage } = window;
  const saveStrings = JSON.parse(localStorage.getItem(GAMES_KEY)) || [];
  return saveStrings;
};

// Filter our invalid factions and recomputer colors
export const scrubPlayers = (players, sets, autoColor) => {
  const maxPlayers = sets.includes('pok') ? 8 : 6;
  const validColors = getSetColors(sets);
  const validFactions = extractProp(
    filterItemsBySets(playerFactions, sets),
    'name'
  );

  let currentValidColors = [];
  let currentValidFactions = [];
  const scrubbedPlayers = players.slice(0, maxPlayers).map(player => {
    const scrubbedColor = validColors.includes(player.color)
      ? player.color
      : getNextItem(currentValidColors, validColors);

    const scrubbedFaction = validFactions.includes(player.faction)
      ? player.faction
      : getNextItem(currentValidFactions, validFactions);

    currentValidColors.push(scrubbedColor);
    currentValidFactions.push(scrubbedFaction);

    return { ...player, color: scrubbedColor, faction: scrubbedFaction };
  });

  return autoColor
    ? adjustPreferredColors(scrubbedPlayers, sets)
    : scrubbedPlayers;
};

export const sortItemsByField = (
  items = [],
  fieldName = 'id',
  direction = 'asc'
) => {
  return items.sort((currentItem, nextItem) => {
    if (currentItem[fieldName] > nextItem[fieldName]) return 1;
    if (currentItem[fieldName] < nextItem[fieldName]) return -1;
    return 0;
  });
};
