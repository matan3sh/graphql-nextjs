import { gql } from '@apollo/client';

export const CREATE_PORTFOLIO = gql`
  mutation CreatePortfolio {
    createPortfolio(
      input: {
        title: "New Job"
        company: "New Company"
        companyWebsite: "New Website"
        location: "New Location"
        jobTitle: "new Job Title"
        description: "New Desc"
        startDate: "12/12/2020"
        endDate: "12/06/2021"
      }
    ) {
      _id
      title
      company
      jobTitle
      description
    }
  }
`;
