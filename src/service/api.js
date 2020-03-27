import axios from "axios";

class APIService {
  constructor() {
    let service = axios.create({
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

  handleRequestSuccess(config) {
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

export default new APIService();
