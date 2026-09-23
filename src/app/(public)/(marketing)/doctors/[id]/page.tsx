import { getAllPublicDoctors } from "@/api";

export async function generateStaticParams() {
  const limit = 100;

  try {
    const first = await getAllPublicDoctors({ page: 1, limit });

    const totalPages = first.meta.totalPages ?? 1;

    const all = [...first.data];
    for (let page = 2; page <= totalPages; page++) {
      const data = await getAllPublicDoctors({ page, limit });
      all.push(...data.data);
    }

    return all.map((doctor) => ({ id: doctor.id }));
  } catch (error) {
    console.error(
      "generateStaticParams: failed to fetch doctors, skipping static generation",
      error,
    );
    return [];
  }
}

export default function page() {
  return (
    <div>
      <h1>This is doctor details page</h1>
    </div>
  );
}
