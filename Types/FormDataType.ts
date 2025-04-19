export type ServerActionFormData = {
  // Next.js Server Actions identifier
  [key: `$ACTION_ID_${string}`]: string;

  // Basic property information
  type: 'Apartment' | 'Condo' | 'House' | 'CabinOrCottage' | 'Room' | 'Studio' | 'Other';
  name: string;
  description?: string;

  // Location
  'location.street'?: string;
  'location.city': string;
  'location.state': string;
  'location.zipcode'?: string;

  // Property details (as strings from FormData)
  beds: string;
  baths: string;
  square_feet: string;

  // Amenities (use formData.getAll('amenities'))
  amenities?: string[];

  // Rates (as strings from FormData)
  'rates.weekly'?: string;
  'rates.monthly'?: string;
  'rates.nightly'?: string;

  // Seller information
  'seller_info.name.'?: string; // Note trailing dot
  'seller_info.email': string;
  'seller_info.phone'?: string;

  // Images (use formData.getAll('images'))
  images: File[]; // Correct for <input type="file" multiple>
};
