const searchPopularPlaces = async (destination) => {
  if (!destination.trim()) {
    return [];
  }

  const searchQuery = `${destination} tourist attractions`;

  const searchUrl =
    `https://en.wikipedia.org/w/api.php` +
    `?action=query` +
    `&list=search` +
    `&srsearch=${encodeURIComponent(searchQuery)}` +
    `&srnamespace=0` +
    `&srlimit=15` +
    `&format=json` +
    `&origin=*`;

  const response = await fetch(searchUrl);

  if (!response.ok) {
    throw new Error("Unable to search destinations");
  }

  const data = await response.json();

  if (!data.query || !data.query.search) {
    return [];
  }

  const queryText = destination.toLowerCase().trim();

  const filteredResults = data.query.search.filter((item) => {
    const title = item.title.toLowerCase().trim();

    // Remove exact destination result
    if (title === queryText) {
      return false;
    }

    // Remove generic Wikipedia list pages
    if (title.startsWith("list of")) {
      return false;
    }

    if (title.startsWith("lists of")) {
      return false;
    }

    if (title.startsWith("tourism in")) {
      return false;
    }

    if (title.startsWith("tourist attractions in")) {
      return false;
    }

    if (title.startsWith("tourist attraction in")) {
      return false;
    }

    if (title.startsWith("list of tourist")) {
      return false;
    }

    if (title.includes("list of tourist attractions")) {
      return false;
    }

    // Remove general tourism pages
    if (title.includes("tourism")) {
      return false;
    }

    // Remove general tourist attraction pages
    if (title === "tourist attraction") {
      return false;
    }

    if (title === "tourist attractions") {
      return false;
    }

    return true;
  });

  // Take the first 3 useful results
  const topThree = filteredResults.slice(0, 3);

  if (topThree.length === 0) {
    return [];
  }

  const pageIds = topThree
    .map((item) => item.pageid)
    .join("|");

  const detailsUrl =
    `https://en.wikipedia.org/w/api.php` +
    `?action=query` +
    `&pageids=${pageIds}` +
    `&prop=extracts|pageimages` +
    `&exintro=1` +
    `&explaintext=1` +
    `&piprop=thumbnail` +
    `&pithumbsize=600` +
    `&format=json` +
    `&origin=*`;

  const detailsResponse = await fetch(detailsUrl);

  if (!detailsResponse.ok) {
    throw new Error("Unable to load destination details");
  }

  const detailsData = await detailsResponse.json();

  const results = topThree
    .map((item) => {
      const page =
        detailsData.query.pages[item.pageid];

      if (!page) {
        return null;
      }

      return {
        name: item.title,

        description:
          page.extract ||
          "Discover this beautiful destination.",

        image:
          page.thumbnail?.source || "",

        wikipediaUrl:
          `https://en.wikipedia.org/?curid=${item.pageid}`
      };
    })
    .filter(Boolean);

  return results;
};

export default searchPopularPlaces;