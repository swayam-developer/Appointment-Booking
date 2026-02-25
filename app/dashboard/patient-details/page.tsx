import PatientDetailsClient from "./PatientDetailsClient";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: {
    doctorId?: string;
    doctorName?: string;
    specialization?: string;
    date?: string;
    slot?: string;
  };
}

export default function PatientDetailsPage({ searchParams }: Props) {
  return <PatientDetailsClient searchParams={searchParams} />;
}