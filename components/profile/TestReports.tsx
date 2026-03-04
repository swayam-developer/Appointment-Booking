export default function TestReports() {
  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm">

      <h3 className="font-semibold mb-4">Upload Test Report</h3>

      <input
        type="file"
        className="border p-3 rounded-lg w-full cursor-pointer hover:border-blue-500"
      />

    </div>
  );
}