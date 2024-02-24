export default async function getPdfId(id) {
  try {
    const response = await fetch(
      `https://api.unchiudaanclasses.com/api/pdfs/${id}`,
      { cache: 'no-store' }
    );
    const data = await response.json();

    if (data.status === "success") {
      return data.data.pdf;
    } else {
      throw new Error("Failed to fetch PDF ID data");
    }
  } catch (error) {
    console.error("Error fetching PDF:", error); 
    throw error;
  }
}
