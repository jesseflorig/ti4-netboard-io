import React from 'react';
import { without } from 'lodash';

import { playerColors, playerFactions } from '../data';
import {
  extractProp,
  filterItemsBySets,
  getFactionByName,
  getNewPlayer,
  getNextItem,
  getSetColors,
  sortItemsByField,
} from '../util';

const initialSets = ['core'];

const initialPlayers = [
  { id: 1, color: playerColors[0].color, faction: playerFactions[0].name },
  { id: 2, color: playerColors[1].color, faction: playerFactions[1].name },
];

export const initialState = {
  victoryPointLimit: 10,
  sets: initialSets,
  usePreferredColors: false,
  players: initialPlayers,
  inactivityTimer: 15,
};

// Compute faction preferred colors
const adjustPreferredColors = (players, sets) => {
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

// Filter our invalid factions and recomputer colors
const scrubPlayers = (players, sets, autoColor) => {
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

export const reducer = (prevState, action) => {
  switch (action.type) {
    case 'UPDATE_VP_LIMIT':
      return { ...prevState, victoryPointLimit: action.payload };
    case 'TOGGLE_POK':
      const newSets = prevState.sets.includes('pok')
        ? without(prevState.sets, 'pok')
        : [...prevState.sets, 'pok'];
      const scrubbedPlayers = scrubPlayers(
        prevState.players,
        newSets,
        prevState.usePreferredColors
      );
      return {
        ...prevState,
        sets: newSets,
        players: scrubbedPlayers,
      };
    case 'TOGGLE_PREFERRED_COLORS':
      const adjustedPlayers = action.payload
        ? adjustPreferredColors(prevState.players, prevState.sets)
        : prevState.players;
      return {
        ...prevState,
        usePreferredColors: action.payload,
        players: adjustedPlayers,
      };
    case 'ADD_PLAYER':
      const newPlayer = getNewPlayer(prevState.players, prevState.sets);
      const adjustedPlayersWithAdded = prevState.usePreferredColors
        ? adjustPreferredColors(
            [...prevState.players, newPlayer],
            prevState.sets
          )
        : [...prevState.players, newPlayer];
      return { ...prevState, players: adjustedPlayersWithAdded };
    case 'DELETE_PLAYER':
      const toDelete = action.payload;
      // Remove the passed player and reset the IDs
      const filteredPlayers = prevState.players
        .filter(player => player.color !== toDelete.color)
        .map((player, idx) => {
          return { ...player, id: idx + 1 };
        });

      const adjustedPlayersWithDeleted = prevState.usePreferredColors
        ? adjustPreferredColors(filteredPlayers, prevState.sets)
        : filteredPlayers;
      return { ...prevState, players: adjustedPlayersWithDeleted };
    case 'UPDATE_INACTIVITY_TIMER':
      return { ...prevState, inactivityTimer: action.payload };
    case 'UPDATE_PLAYER_FIELD':
      const targetField = action.payload.field;
      // Exclude currentPlayer and potential swapPlayer
      const prevPlayers = prevState.players.filter(
        player =>
          player[targetField] !== action.payload.prev &&
          player[targetField] !== action.payload.next
      );

      // Check if existing player needs to swap with old currentPlayer
      const swapPlayer = prevState.players.filter(
        player => player[targetField] === action.payload.next
      )[0];

      const currentPlayer = prevState.players.filter(
        player => player[targetField] === action.payload.prev
      )[0];
      currentPlayer[targetField] = action.payload.next;

      // Return sorted players with updated swap player
      if (swapPlayer) {
        swapPlayer[targetField] = action.payload.prev;
        const sortedPlayers = sortItemsByField([
          ...prevPlayers,
          currentPlayer,
          swapPlayer,
        ]);
        const adjustedPlayersWithSwap = prevState.usePreferredColors
          ? adjustPreferredColors(sortedPlayers, prevState.sets)
          : sortedPlayers;
        return { ...prevState, players: adjustedPlayersWithSwap };
      }

      // Return updated and sorted players
      const sortedPlayers = sortItemsByField([...prevPlayers, currentPlayer]);
      const adjustedPlayersWithUpdate = prevState.usePreferredColors
        ? adjustPreferredColors(sortedPlayers, prevState.sets)
        : sortedPlayers;
      return { ...prevState, players: adjustedPlayersWithUpdate };
    default:
      throw new Error(`Action "${action.type}" not found`);
  }
};

const Store = React.createContext();

export default Store;
