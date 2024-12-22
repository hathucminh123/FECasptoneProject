import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../mainService";

interface CompanyInfo {
    id: string;
    name: string;
    internationalName: string;
    shortName: string;
    address: string;
  }
  
  interface signal {
    signal: AbortSignal;
    code?:number|string
  }
  
  interface FetchError extends Error {
    code?: number;
    info?: Record<string, unknown>;
  }
  
  export const TaxCode = async ({ signal ,code}: signal): Promise<{
    company: CompanyInfo;
  }> => {
    try {
      const response = await httpClient.get({
        url: `${apiLinks.TaxCode.GET}/${code}` , // Cập nhật URL nếu cần
        signal: signal,
      });
  
      if (response.status !== 200) {
        const error: FetchError = new Error(
          "An error occurred while fetching company information"
        );
        error.code = response.status;
        error.info = response.data as Record<string, unknown>;
        throw error;
      }
  
      const companyData = response.data.data; // Lấy dữ liệu từ key `data`
  
      return {
        company: {
          id: companyData.id,
          name: companyData.name,
          internationalName: companyData.internationalName,
          shortName: companyData.shortName,
          address: companyData.address,
        },
      };
    } catch (error) {
      console.error("Fetching company information failed", error);
      throw error;
    }
  };
  