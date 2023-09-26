import axios from "axios";
import cheerio from "cheerio";

async function validateURL(url) {
  try {
    const response = await axios.get(url);
    // Check the HTTP status code to verify if the URL can be fetched successfully
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error validating URL:", error);
    return false;
  }
}

// Find Arcticle Schema
export async function findArticleSchema(url) {
  const isURLValid = validateURL(url);
  if (isURLValid) {
    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      const hasArcticlechema = $('script[type="application/ld+json"]')
        .toArray()
        .some((element) => {
          try {
            const jsonLD = JSON.parse($(element).html());
            return jsonLD["@type"] === "Article";
          } catch (error) {
            return false;
          }
        });
      if (hasArcticlechema) {
        console.log("Arcticle Schema found on the webpage.");
      } else {
        console.log("Arcticle Schema not found on the webpage.");
      }

      return hasArcticlechema;
    } catch (error) {
      console.error("Error fetching or parsing webpage:", error);
      return false;
    }
  }
}

//Find FAQs Schema

export async function findFAQSchema(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const hasFAQSchema = $('script[type="application/ld+json"]')
      .toArray()
      .some((element) => {
        try {
          const jsonLD = JSON.parse($(element).html());
          return jsonLD["@type"] === "FAQPage";
        } catch (error) {
          return false;
        }
      });

    if (hasFAQSchema) {
      console.log("FAQ Schema found on the webpage.");
    } else {
      console.log("FAQ Schema not found on the webpage.");
    }

    return hasFAQSchema;
  } catch (error) {
    console.error("Error fetching or parsing webpage:", error);
    return false;
  }
}

// Find Organiztion Schema

export async function findOrganizationSchema(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const hasOrganizationSchema = $('script[type="application/ld+json"]')
      .toArray()
      .some((element) => {
        try {
          const jsonLD = JSON.parse($(element).html());
          return jsonLD["@type"] === "Organization";
        } catch (error) {
          return false;
        }
      });

    if (hasOrganizationSchema) {
      console.log("Organization Schema found on the webpage.");
    } else {
      console.log("Organization Schema not found on the webpage.");
    }

    return hasOrganizationSchema;
  } catch (error) {
    console.error("Error fetching or parsing webpage:", error);
    return false;
  }
}

// Find Product Schema

export async function findProductSchema(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const hasProductSchema = $('script[type="application/ld+json"]')
      .toArray()
      .some((element) => {
        try {
          const jsonLD = JSON.parse($(element).html());
          return jsonLD["@type"] === "Product";
        } catch (error) {
          return false;
        }
      });

    if (hasProductSchema) {
      console.log("Product Schema found on the webpage.");
    } else {
      console.log("Product Schema not found on the webpage.");
    }

    return hasProductSchema;
  } catch (error) {
    console.error("Error fetching or parsing webpage:", error);
    return false;
  }
}
