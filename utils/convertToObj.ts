interface SerializableObject {
  [key: string]: any;
}

export default function convertToSerializableObject(leanDocument: SerializableObject): SerializableObject {
  for (const key of Object.keys(leanDocument)) {
    if (leanDocument[key].toJSON && leanDocument[key].toString) {
      leanDocument[key] = leanDocument[key].toString();
    }
  }
  return leanDocument;
}
