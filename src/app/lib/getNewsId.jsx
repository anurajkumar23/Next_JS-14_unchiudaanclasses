export default async function getNewsId(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/news/${id}`,
      { cache: 'no-store' }
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
