export default function Documents() {
  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm">

      <h3 className="font-semibold mb-4">
        Upload Medical Documents
      </h3>

      <input
        type="file"
        className="border p-3 rounded-lg w-full hover:border-blue-500 cursor-pointer"
      />

    </div>
  );
}