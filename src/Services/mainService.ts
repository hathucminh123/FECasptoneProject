// import httpClient from "../httpClient/httpClient";

import { QueryClient } from "@tanstack/react-query";

const baseURL = "https://finalcapstonebe-aib5.onrender.com/api";

export const queryClient = new QueryClient();

export const apiLinks = {
    auth: {
      login: `${baseURL}/Auth/login`,
      register:`${baseURL}/Auth/register`,
    },
}