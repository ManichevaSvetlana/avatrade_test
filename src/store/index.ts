import { createStore } from "vuex";
import { user } from "./user";
import { RootState } from "@/types/store";

export default createStore<RootState>({
  modules: {
    user,
  },
});
