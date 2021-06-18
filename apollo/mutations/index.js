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

export const UPDATE_PORTFOLIO = gql`
  mutation UpdatePortfolio($id: ID) {
    updatePortfolio(id: $id, input: { title: "Updated Job!!!" }) {
      _id
      title
      company
      jobTitle
      description
    }
  }
`;

export const DELETE_PORTFOLIO = gql`
  mutation DeletePortfolio($id: ID) {
    deletePortfolio(id: $id)
  }
`;
