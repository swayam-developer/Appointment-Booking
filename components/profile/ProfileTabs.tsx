export default function ProfileTabs({ activeTab, setActiveTab }: any) {
  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "prescriptions", label: "Prescriptions" },
    { id: "reports", label: "Test Reports" },
    { id: "documents", label: "Documents" },
    { id: "vitals", label: "Vital Signs" },
    { id: "emergency", label: "Emergency" },
  ];

  return (
    <div className="flex gap-6 border-b pb-3">

      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`pb-2 text-sm font-medium cursor-pointer
          ${
            activeTab === tab.id
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          {tab.label}
        </button>
      ))}

    </div>
  );
}