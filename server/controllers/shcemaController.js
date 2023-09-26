import {
  findArticleSchema,
  findFAQSchema,
  findOrganizationSchema,
  findProductSchema,
} from "../utils/findSchema.js";

// Arcticle Schema Controller

export const getArticleSchema = async (req, res) => {
  const { url } = req.body;
  let URL_ListArray_WithOut_Shcema = [];

  for (let i = 0; i < url.length; i++) {
    const websiteUrl = url[i];
    await findArticleSchema(websiteUrl)
      .then((hasSchema) => {
        if (hasSchema) {
          return;
        } else {
          URL_ListArray_WithOut_Shcema.push(websiteUrl);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }

  res.send({
    status: 200,
    data: {
      URL_ListArray_WithOut__Shcema: URL_ListArray_WithOut_Shcema,
      totalNumber: URL_ListArray_WithOut_Shcema.length,
      totalNumber_URLs_WeCheck: url.length,
      schemaType: "Article",
    },
  });
};

// FAQs Schema Controller

export const getFAQsSchema = async (req, res) => {
  const { url } = req.body;

  let URL_ListArray_WithOut_Shcema = [];

  for (let i = 0; i < url.length; i++) {
    const websiteUrl = url[i];
    await findFAQSchema(websiteUrl)
      .then((hasSchema) => {
        if (hasSchema) {
          return;
        } else {
          URL_ListArray_WithOut_Shcema.push(websiteUrl);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }

  res.send({
    status: 200,
    data: {
      URL_ListArray_WithOut__Shcema: URL_ListArray_WithOut_Shcema,
      totalNumber: URL_ListArray_WithOut_Shcema.length,
      totalNumber_URLs_WeCheck: url.length,
      schemaType: "FAQ",
    },
  });
};

// Organiztion Schema Controller

export const getOrganiztionSchema = async (req, res) => {
  const { url } = req.body;

  let URL_ListArray_WithOut_Shcema = [];

  for (let i = 0; i < url.length; i++) {
    const websiteUrl = url[i];
    await findOrganizationSchema(websiteUrl)
      .then((hasSchema) => {
        if (hasSchema) {
          return;
        } else {
          URL_ListArray_WithOut_Shcema.push(websiteUrl);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }

  res.send({
    status: 200,
    data: {
      URL_ListArray_WithOut__Shcema: URL_ListArray_WithOut_Shcema,
      totalNumber: URL_ListArray_WithOut_Shcema.length,
      totalNumber_URLs_WeCheck: url.length,
      schemaType: "Organiztion",
    },
  });
};

// Product Schema Controller

export const getProductSchema = async (req, res) => {
  const { url } = req.body;

  let URL_ListArray_WithOut_Shcema = [];

  for (let i = 0; i < url.length; i++) {
    const websiteUrl = url[i];
    await findProductSchema(websiteUrl)
      .then((hasSchema) => {
        if (hasSchema) {
          return;
        } else {
          URL_ListArray_WithOut_Shcema.push(websiteUrl);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }

  res.send({
    status: 200,
    data: {
      URL_ListArray_WithOut__Shcema: URL_ListArray_WithOut_Shcema,
      totalNumber: URL_ListArray_WithOut_Shcema.length,
      totalNumber_URLs_WeCheck: url.length,
      schemaType: "Product",
    },
  });
};
