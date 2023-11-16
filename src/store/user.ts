import { createStore } from "vuex";
import { UserState } from "@/types/user";
import fakeAxios from "@/plugins/fakeAxios";

export const user = createStore<UserState>({
  state: {
    isLoggedIn: false,
    user: {
      name: null,
      email: null,
      token: null,
    },
    error: null,
  },
  mutations: {
    SET_USER(state, userData: { email: string; name: string; token: string }) {
      state.isLoggedIn = true;
      state.user = userData;
    },
    CLEAR_USER(state) {
      state.isLoggedIn = false;
      state.user = {
        name: null,
        email: null,
        token: null,
      };
    },
    SET_ERROR(state, errorMessage: string) {
      state.error = errorMessage;
    },
  },
  actions: {
    login({ commit }, credentials: { email: string; password: string }) {
      fakeAxios
        .post("/login", credentials)
        .then((response) => {
          commit("SET_USER", response.data);
        })
        .catch((error) => {
          commit("SET_ERROR", error);
        });
    },
    logout({ state, commit }) {
      const token = state.user.token;

      if (token) {
        fakeAxios
          .post("/logout", { token })
          .then(() => {
            commit("CLEAR_USER");
          })
          .catch((error) => {
            commit("SET_ERROR", error);
          });
      } else {
        commit("SET_ERROR", "No token found");
      }
    },
  },
});
