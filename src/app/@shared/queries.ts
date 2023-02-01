import { gql } from "graphql-tag";

export const GetOverallList = gql`query{ 
        active_bookings{
          user_profile{
            name
            phone
          },
          service_detail{
            name
          },
          booking_date
          service_date
          booking_status{
            name
          }
        }
      }`

export const vendorList = gql`query{
    vendors_list{
      email
    }
}`