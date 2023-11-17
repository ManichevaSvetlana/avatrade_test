interface ApiResponse {
  data?: {
    user: { email: string; name: string };
    token?: string;
  };
  message?: string;
}

const fakeAxios = {
  post(
    url: string,
    data: { email?: string; password?: string; token?: string }
  ): Promise<ApiResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (url === "/login") {
          if (data.email === "test@test.com" && data.password === "password") {
            const response: ApiResponse = {
              data: {
                user: { email: data.email, name: "Test User" },
                token: "1234567890",
              },
            };
            resolve(response);
          } else {
            reject("Invalid email or password");
          }
        } else if (url === "/logout") {
          const response: ApiResponse = {
            message:
              data.token === "1234567890"
                ? "Logged out successfully"
                : "Invalid token",
          };
          resolve(response);
        } else if (url === "/user") {
          if (data.token === "1234567890") {
            const response: ApiResponse = {
              data: {
                user: { email: "test@test.com", name: "Test User" },
              },
            };
            resolve(response);
          } else {
            reject("Invalid token");
          }
        } else if (url === "/deposit") {
          if (data.token === "1234567890") {
            const response: ApiResponse = {
              message: "Deposit paid successfully",
            };
            resolve(response);
          } else {
            reject("Invalid token");
          }
        }
      }, 1000);
    });
  },
};

export default fakeAxios;
