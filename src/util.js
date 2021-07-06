import { playerColors, playerFactions } from './data';

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

  return { id: nextPlayerCount, color: nextColor, faction: nextFaction };
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
