import axios from "axios";
import store from "../store";

import store from '../store'

console.log(store)

class Service {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.VUE_APP_HOST}/api/v1/`
      //   headers: { someHeader: "someValue" }
    });
    service.interceptors.request.use(
      this.handleRequestSuccess,
      this.handleRequestError
    );
    service.interceptors.response.use(
      this.handleResponseSuccess,
      this.handleResponseError
    );
    this.service = service;
  }

  async handleRequestSuccess(config) {
    if (!store.state.auth.tokens) {
      return config;
    }

    const { access } = store.state.auth.tokens;
    if (access) {
      // Will trigger infinite loop if trying to refresh on refresh call
      if (!config.url.startsWith("token/")) {
        await store.dispatch("auth/tryRefresh");
        const { access } = store.state.auth.tokens;
        config.headers.authorization = `Bearer ${access}`;
      }
    }
    return config;
  }

  handleRequestError(error) {
    return Promise.reject(error);
  }

  handleResponseSuccess(response) {
    return response;
  }

  handleResponseError(error) {
    return Promise.reject(error);
  }
}

export const API = new Service();
