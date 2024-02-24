export default async function getCurrentAffairs(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/currentaffairs/${id}`,
      { cache: 'no-store' }
    );
    const data = await response.json();
    if (data.status === "success") {
      return data.data.affairs;
    } else {
      throw new Error("Failed to fetch affairs data");
    }
  } catch (error) {
    console.error("Error fetching affairs:", error);
    throw error;
  }
}
