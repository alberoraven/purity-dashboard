import { gql } from "graphql-tag";

export const GetOverallList = gql`query{ 
    active_bookings {
      user_profile {
        name
        phone
      }
      service_detail {
        name
      }
      booking_date
      service_date
      booking_status {
        name
      }
    }  
  }`

export const vendorList = gql`query MyQuery {
  vendor_profiles {
    email
    name
    locality
    user_id
  }
}`

export const UnAssignedUsers = gql`query {
  active_bookings(where: {status: {_eq: "1"}}) {
    user_profile {
      email
      name
      user_id
    }
    service_detail {
      name
    }
  }
}`