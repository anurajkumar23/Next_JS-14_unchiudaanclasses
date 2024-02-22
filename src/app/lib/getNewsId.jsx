export default async function getNewsId(id) {
  try {
    const response = await fetch(
      `https://api.unchiudaanclasses.com/api/news/${id}`
    );
    const data = await response.json();

    if (data.status === "success") {
      return data.data.news;
    } else {
      throw new Error("Failed to fetch News ID data");
    }
  } catch (error) {
    console.error("Error fetching News:", error);
    throw error;
  }
}
