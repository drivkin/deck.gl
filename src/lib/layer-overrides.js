import {window} from './utils/globals';

const overrides = new Map();

export const setOverride = (id, valuePath, value) => {

  if (!window.__SEER_INITIALIZED__) {
    return;
  }

  if (!overrides.has(id)) {
    overrides.set(id, new Map());
  }

  const props = overrides.get(id);
  props.set(valuePath, value);

};

const recursiveSet = (obj, path, value) => {
  if (path.length > 1) {
    recursiveSet(obj[path[0]], path.slice(1), value);
  } else {
    obj[path[0]] = value;
  }
};

export const getOverrides = props => {

  if (!window.__SEER_INITIALIZED__ || !props.id) {
    return;
  }

  const overs = overrides.get(props.id);
  if (!overs) {
    return;
  }

  overs.forEach((value, valuePath) => {
    recursiveSet(props, valuePath, value);
  });

  props.data = [...props.data];

};
