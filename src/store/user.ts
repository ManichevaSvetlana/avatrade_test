import { UserState } from "@/types/user";
import fakeAxios from "@/plugins/fakeAxios";
import { ActionContext } from "vuex";

const initializeUser = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  } else {
    return { name: null, email: null, token: null };
  }
};

export const user = {
  state: (): UserState => ({
    isLoggedIn: localStorage.getItem("user") !== null,
    user: initializeUser(),
  }),
  mutations: {
    SET_USER(
      state: UserState,
      userData: { email: string; name: string; token: string }
    ) {
      state.isLoggedIn = true;
      state.user = userData;

      localStorage.setItem("user", JSON.stringify(userData));
    },
    CLEAR_USER(state: UserState) {
      state.isLoggedIn = false;
      state.user = {
        name: null,
        email: null,
        token: null,
      };

      localStorage.removeItem("user");
    },
  },
  actions: {
    getUser(context: ActionContext<UserState, unknown>) {
      return new Promise((resolve, reject) => {
        const { commit, state } = context;
        const token = state.user.token;

        if (token) {
          fakeAxios
            .post("/user", { token })
            .then((response) => {
              commit("SET_USER", response.data);
              resolve(response);
            })
            .catch((error) => {
              commit("CLEAR_USER");
              reject(error);
            });
        } else {
          commit("CLEAR_USER");
          reject("No token found");
        }
      });
    },
    login(
      context: ActionContext<UserState, unknown>,
      credentials: { email: string; password: string }
    ) {
      return new Promise((resolve, reject) => {
        fakeAxios
          .post("/login", credentials)
          .then((response) => {
            context.commit("SET_USER", response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    logout(context: ActionContext<UserState, unknown>) {
      return new Promise((resolve, reject) => {
        const { commit, state } = context;
        const token = state.user.token;

        if (token) {
          fakeAxios
            .post("/logout", { token })
            .then((response) => {
              commit("CLEAR_USER");
              resolve(response);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          commit("SET_ERROR", "No token found");
          reject("No token found");
        }
      });
    },
  },
};
