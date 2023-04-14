// const schema = new Schema();

// schema.path('_id'); // ObjectId { ... }

// const Model = mongoose.model('Test', schema);

// const doc = new Model();
// doc._id instanceof mongoose.Types.ObjectId; // true

// const schema = new Schema({ _id: Number });
// const Model = mongoose.model('Test', schema);

// const doc = new Model();
// await doc.save(); // Throws "document must have an _id before saving"

// doc._id = 1;
// await doc.save(); // works
