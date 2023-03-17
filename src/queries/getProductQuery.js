import { Query, Field } from "@tilework/opus";

const getProductQuery = (id) => {
  const query = new Query("product")
    .addArgument("id", "String!", id)
    .addFieldList(["name", "inStock", "description"])
    .addField(new Field("gallery", true))
    .addFieldList(["category", "id"])
    .addField(
      new Field("attributes", true)
        .addFieldList(["name", "id", "type"])
        .addField(
          new Field("items", true).addFieldList(["displayValue", "value", "id"])
        )
    )
    .addField(
      new Field("prices", true)
        .addField("amount")
        .addField(new Field("currency", true).addFieldList(["label", "symbol"]))
    );

  return query;
};

export default getProductQuery;
