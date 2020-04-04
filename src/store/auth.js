import { API } from "@/service/api";

import jwtDecode from "jwt-decode";
import router from "../router";

const AUTH_ENDPOINT = "token";

const MUTATIONS = {
  SET_TOKENS: "SET_TOKENS"
};

const state = {
  expiration: null,
  tokens: {
    refresh: null,
    access: null
  }
};

const getters = {};

const mutations = {
  [MUTATIONS.SET_TOKENS](state, tokens) {
    if (!tokens) {
      state.tokens = null;
      state.expiration = null;
      return;
    }

    const decoded = jwtDecode(tokens.access);
    state.expiration = new Date(decoded.exp * 1000);

    state.tokens = {
      ...state.tokens,
      ...tokens
    };
  }
};

const actions = {
  load({ commit }) {
    const tokenStr = localStorage.getItem("auth-token");
    if (!tokenStr) return;

    commit(MUTATIONS.SET_TOKENS, JSON.parse(tokenStr));
  },

  /**
   * Getting all dummies
   */
  async login({ commit }, credentials) {
    try {
      const response = await API.service.post(AUTH_ENDPOINT + "/", credentials);
      localStorage.setItem("auth-tokens", JSON.stringify(response.data));
      commit(MUTATIONS.SET_TOKENS, response.data);
    } catch (e) {
      console.log(e);
    }
  },

  logout({ commit }, { redirect }) {
    commit(MUTATIONS.SET_TOKENS, null);
    localStorage.removeItem("auth-tokens");
    if (redirect) {
      router.push(redirect);
    }
  },

  async tryRefresh({ commit, state, dispatch }) {
    if (!state.expiration && new Date() < state.expiration) return;

    try {
      const response = await API.service.post(AUTH_ENDPOINT + "/refresh/", {
        refresh: state.refresh
      });
      commit(MUTATIONS.SET_TOKENS, response.data);
    } catch (e) {
      dispatch("logout", {});
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
};
