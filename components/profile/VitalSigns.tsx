export default function VitalSigns() {
  return (
    <div className="grid md:grid-cols-3 gap-6">

      <Card title="Blood Pressure" value="120/80" />
      <Card title="Heart Rate" value="72 bpm" />
      <Card title="Temperature" value="98.6°F" />

    </div>
  );
}

function Card({ title, value }: any) {
  return (
    <div className="bg-green-50 p-6 rounded-xl border hover:shadow-md transition cursor-pointer">

      <h4 className="text-gray-600">{title}</h4>

      <p className="text-xl font-semibold text-green-600">
        {value}
      </p>

    </div>
  );
}