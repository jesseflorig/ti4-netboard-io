import React from 'react';
import { without } from 'lodash';

import { playerColors, playerFactions } from '../data';
import {
  addGame,
  adjustPreferredColors,
  loadGameSaves,
  genGameId,
  getNewPlayer,
  initialPlayerMeta,
  saveGames,
  scrubPlayers,
  sortItemsByField,
} from '../util';

const newId = genGameId();

const initialSets = ['core'];

const initialPlayers = [
  {
    id: 1,
    color: playerColors[0].color,
    faction: playerFactions[0].name,
    ...initialPlayerMeta,
  },
  {
    id: 2,
    color: playerColors[1].color,
    faction: playerFactions[1].name,
    ...initialPlayerMeta,
  },
];

export const initialState = {
  id: newId,
  activeGame: false,
  gameSaves: [],
  victoryPointLimit: 10,
  sets: initialSets,
  usePreferredColors: false,
  players: initialPlayers,
  inactivityTimer: 15,
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
    case 'INIT':
      // Load avaialable games
      const gameSaves = loadGameSaves();
      return { ...prevState, gameSaves };
    case 'START_NEW_GAME':
      addGame(prevState);
      return { ...prevState, activeGame: true };
    case 'DELETE_SAVE':
      const newSaves = prevState.gameSaves.filter(
        saveString => !saveString.includes(action.payload)
      );
      saveGames(newSaves);
      return { ...prevState, gameSaves: newSaves };
    default:
      throw new Error(`Action "${action.type}" not found`);
  }
};

const Store = React.createContext();

export default Store;
