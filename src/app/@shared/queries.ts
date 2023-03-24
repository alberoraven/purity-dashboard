import { gql } from "graphql-tag";

export const GetOverallList = gql`query { 
    active_bookings (order_by: {booking_id: asc}) {
      user_profile {
        name
        phone
      }
      service_detail {
        name
      }
      vendor_profile{
        name
      }
      booking_id
      booking_date
      service_date
      booking_status {
        name
      }
    }  
  }`

export const vendorList = gql`query {
  vendor_profiles {
    email
    name
    locality
    user_id
    city
    service_list
    is_vendor_available
    is_available
    address
    is_profile_completed
    wallet_money
    phone
    pincode
  }
}`
export const getVendorDetails = (userId: any) => gql`query {
  vendor_profiles(where: {user_id: {_eq: "${userId}"}}) {
    email
    name
    locality
    phone
    address
    city
  } user(id: "${userId}"){
    displayName
    avatarUrl
  }
}
`
export const UnAssignedUsers = gql`query {
  active_bookings(where: {status: {_eq: "1"}}order_by: {booking_id: asc}) {
    user_profile {
      email
      name
      user_id
    }
    booking_id
    service_date
    booking_date
    service_detail {
      name
    }
  }
  }`

export const UpdateUser = (booking_id: any, vendor_id: any) => gql`  mutation assignVendor {
  update_active_bookings_by_pk(pk_columns: {booking_id: ${booking_id}}, _set: {status: "2", vendor_id: "${vendor_id}"}) {
    status
  }
}`

export const addVendor = (vendorEmail: any) => gql`mutation MyMutation {
  insert_vendors_list(objects: {email: "${vendorEmail}"}) {
    returning {
      email
    }
  }
}`

export const GetUserProfile = (userId: any) => {
  return `query {
      user_profiles(where: {user_id: {_eq: "${userId}"}}) {
    		user {
          email
          avatarUrl
          displayName
        }
        phone
    		user_addresses(where: {is_preferred_address: {_eq: true}}) {
          address
          locality
          city
          pincode
        }
      }
    }`;
};

export const serviceDetailsList = `query {
  service_details {
    description
    duration
    name
    price
    share_amount
    sid
  }
}`


export const UpdateServiceDetails = (sid: any, details: any) => gql`  mutation {
  update_service_details(where: {sid: {_eq: "${sid}"}}, _set: {description: "${details.description}", duration: "${details.duration}", name: "${details.name}", price: "${details.price}", share_amount: "${details.share_amount}"}) {
    returning {
      description
    }
  }
}`
export const InsertServiceDetails = (details: any) => gql`  mutation {
  insert_service_details(objects: {description: "${details.description}", duration: "${details.duration}", name: "${details.name}", price: "${details.price}", share_amount: "${details.share_amount}", is_active: true}) {
    returning {
      name
    }
  }
}`


export const getOfferDetails = `query{
  offers {
    id
    coupon_code
    description
    discount
    is_valid
    title
    service_detail {
      name
      sid
    }
  }
}`

export const UpdateOfferDetails = (id: any, details: any) => gql`  mutation {
  update_offers(where: {id: {_eq: ${id}}}, _set: {description: "${details.description}", coupon_code: "${details.coupon_code}", discount: "${details.discount}", is_valid: "${details.is_valid}", title: "${details.title}",service_id: "${details.service_detail.sid}" }) {
    returning {
      description
    }
  }
}`

export const InsertOfferDetails = (details: any) => gql`  mutation {
  insert_offers(objects: {description: "${details.description}", coupon_code: "${details.coupon_code}", discount: "${details.discount}", is_valid: "${details.is_valid}", title: "${details.title}",service_id: "${details.service_detail.sid}" }) {
    returning {
      description
    }
  }
}`

export const UpdateVendorDetais = (user_id: any, details: any) => gql`  mutation {
  update_vendor_profiles(where: {user_id: {_eq: "${user_id}"}}, _set: {name: "${details.name}", phone: "${details.phone}", address: "${details.address}", wallet_money: ${details.wallet_money} ,city: "${details.city}", locality: "${details.locality}"} ) {
    returning {
      user_id
    }
  }
}`