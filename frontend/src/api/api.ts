import axios from "axios";

const BASE = "http://localhost:8000";

export const startNewGame = async (user: string) => {
  const URL = BASE + "/games/newIndividualGame";
  const headers = {
    Authorization: user,
  };
  const res = await axios.post(URL, null, { headers }).catch(() => {
    return undefined;
  });
  if (res !== undefined) {
    return res;
  }
  return undefined;
};

export const updateGame = async (user: string, guess: string) => {
  const URL = BASE + "/games/updateGame";
  const headers = {
    Authorization: user,
  };
  const res = await axios.post(URL, { guess }, { headers }).catch(() => {
    return undefined;
  });
  if (res !== undefined) {
    return res.data.data;
  }
  return undefined;
};

export const finishGame = async (user: string) => {
  const URL = BASE + "/games/finishGame";
  const headers = {
    Authorization: user,
  };
  const res = await axios.post(URL, null, { headers }).catch(() => {
    return undefined;
  });
  if (res !== undefined) {
    return res.data.data;
  }
  return undefined;
};
