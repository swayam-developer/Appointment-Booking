export default function Prescriptions() {
  return (
    <div className="grid md:grid-cols-2 gap-6">

      <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition">

        <h3 className="font-semibold mb-3 text-gray-700">
          Current Prescription
        </h3>

        <p className="text-gray-500 text-sm">
          No prescriptions available
        </p>

      </div>

    </div>
  );
}