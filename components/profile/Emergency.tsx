export default function Emergency() {
  return (
    <div className="bg-red-50 p-6 rounded-xl border">

      <h3 className="font-semibold mb-4 text-red-600">
        Emergency Contact
      </h3>

      <div className="space-y-3">

        <input
          placeholder="Contact Name"
          className="border p-2 rounded w-full"
        />

        <input
          placeholder="Phone Number"
          className="border p-2 rounded w-full"
        />

        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer">
          Save Contact
        </button>

      </div>

    </div>
  );
}