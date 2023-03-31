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
          id
          avatarUrl
          displayName
        }
        name
        email
        phone
        is_profile_completed
    		user_addresses {
          id
          address_name
          address
          locality
          city
          pincode
          is_preferred_address
        }
      }
    }`;
};

export const IsUserProfileCompleted = (userId: any) => {
  return `query {
      user_profiles(where: {user_id: {_eq: "${userId}"}}) {
        user_id
        name
        phone
        is_profile_completed
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
    reviews_count
    ratings
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

export const mySubs = gql `subscription MySubscription {
  user_addresses {
    id
    address_name
    address
    is_preferred_address
    locality
    city
    pincode
  }
}`


export const UpdateUserProfile = (profileData: any) => {
  return gql `mutation {
    update_user_profiles_by_pk(pk_columns: {user_id: "${profileData.user_id}"}, 
    _set: {
      name: "${profileData.name}",
      phone: "${profileData.phone}",
      email: "${profileData.email}"
    }) {
      name
      phone
      email
    }
  }`;
};

export const UpdateUserAddress = (addressData: any) => {
  return `mutation UpdateAddressById {
    update_user_addresses_by_pk(pk_columns: {id: "${addressData.address_id}"}, _set: {
      user_id: "${addressData.user_id}",
      address_name: "${addressData.address_name}",
      address: "${addressData.address}",
      city: "${addressData.city}",
      locality: "${addressData.locality}",
      pincode: "${addressData.pincode}",
      is_preferred_address: "${addressData.is_preferred_address}"
    }) {
      id
      user_id
      address_name
      address
      city
      locality
      pincode
      is_preferred_address
    }
  }`;
};
export const AddUserAddress = (addressData: any) => {
  return `mutation addAddress {
    insert_user_addresses(objects: {
      user_id: "${addressData.user_id}",
      address_name: "${addressData.address_name}",
      address: "${addressData.address}",
      city: "${addressData.city}",
      locality: "${addressData.locality}",
      pincode: "${addressData.pincode}",
      is_preferred_address: "${addressData.is_preferred_address}"
    }) {
      returning {
          address
          address_name
          city
          id
          is_preferred_address
          locality
          pincode
          user_id
      }
    }
  }`;
};

export const CreateUserProfile = (profileData: any) => {
  return `mutation createUserProfile {
     insert_user_profiles(objects: {
      user_id: "${profileData.user_id}",
      name: "${profileData.name}",
      phone: "${profileData.phone}",
      email: "${profileData.email}",
      is_profile_completed: true,
      user_addresses: {
        data: {
          address_name: "Home",
          address: "${profileData.address}",
          locality: "${profileData.locality}",
          city: "${profileData.city}",
          pincode: "${profileData.pincode}",
          is_preferred_address: ${profileData.is_preferred_address}
        }
      }}) {
     returning {
      name
      phone
      is_profile_completed
      user_id
     }
     }
    }`;
};

export const ServiceBooking = (bookingData: any) => {
  return `mutation {
    insert_active_bookings(objects: {
      user_id: "${bookingData.user_id}",
      service_id: "${bookingData.service_id}",
      service_date: "${bookingData.service_date}",
      address: "${bookingData.address}",
      city: "${bookingData.city}",
      locality: "${bookingData.locality}",
      pincode: "${bookingData.pincode}"
    }) {
      returning {
        address
        booking_date
        booking_id
        service_date
        service_id
        status
        user_id
        vendor_id
        service_detail {
          name
          sid
          is_active
          is_available
          description
          duration
          price
          ratings
          reviews_count
          share_amount
        }
      }
    }
  }`;
};