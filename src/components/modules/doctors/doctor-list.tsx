"use client";

import { useGetAllPublicDoctors } from "@/hooks";
import Link from "next/link";

export default function DoctorList() {
  const { data } = useGetAllPublicDoctors({ limit: 100, page: 1 });

  const doctorList = data?.data || [];

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex gap-3">
        {doctorList.map((doctor) => (
          <Link key={doctor.id} href={`/doctors/${doctor.id}`}>
            {doctor.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
