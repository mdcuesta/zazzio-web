import ListingSchema from './schemas/listing-schema';
import * as DataProvider from '../utilities/data-provider';

const listingSchema = ListingSchema;

// export
const db = DataProvider.getConnection();
const listingModel = db.model('Listing', listingSchema);
export default listingModel;

