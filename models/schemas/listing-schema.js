import { Schema } from 'mongoose';

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.ObjectId,
    required: true,
    index: true,
  },
  type: {
    type: String,
    required: true,
  },
  address: {
    street: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    district: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    subdivision: {
      type: String,
    },
  },
  coordinates: {
    longitude: {
      type: Number,
    },
    latitude: {
      type: Number,
    },
  },
  propertyType: {
    type: String,
    required: true,
    index: true,
  },
  description: {
    type: String,
  },
  attributes: {
    beds: {
      number: {
        type: Number,
      },
      isStudio: {
        type: Boolean,
      },
    },
    bathRooms: {
      number: {
        type: Number,
      },
    },
    parking: {
      number: {
        type: Number,
      },
    },
    floors: {
      number: {
        type: Number,
      },
    },
    furnishing: {
      type: String,
    },
    hasBalcony: {
      type: Boolean,
    },
    floorArea: {
      type: Number,
    },
    lotArea: {
      type: Number,
    },
    rentalFee: {
      type: Number,
    },
  },
  photos: [{
    photo: {
      type: String,
    },
    type: {
      type: String,
    },
  }],
});

export default listingSchema;
