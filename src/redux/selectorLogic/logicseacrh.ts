import { createSelector } from "reselect";
import { RootState } from "../store";
import { companyData, jobData } from "../../assets/data/CompanyData";

// Helper function to remove accents and normalize strings
const removeAccents = (str: string | null) => {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
};

// Selectors
const selectSearch = (state: RootState) => state.search.search;
const selectJobData = () => jobData;
const selectCompanyData = () => companyData;

// Updated TodoListSelector
export const TodoListSelector = createSelector(
  [selectJobData, selectSearch, selectCompanyData],
  (jobs, search, companies) => {
    return jobs.filter((job) => {
 
      const searchText = removeAccents(search.text || "");

      const matchesText = searchText
        ? removeAccents(job.title).includes(searchText)
        : true;

      const company = companies.find((item) => item.id === job.companyId);

      // Check if company name matches the search text
      const matchCompanyName = company
        ? removeAccents(company.name).includes(searchText)
        : false;

      const matchSkill = searchText
        ? job.tags.some((skill) => removeAccents(skill).includes(searchText))
        : false;


      const matchesLocation = search.location
        ? removeAccents(job.location || "").includes(
            removeAccents(search.location)
          )
        : true;

      return (matchesText || matchCompanyName || matchSkill) && matchesLocation;
    });
  }
);
