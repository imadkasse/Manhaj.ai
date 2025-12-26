export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-amiri text-primary mb-6">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-lg shadow border border-border">
          <h3 className="text-lg font-medium text-muted-foreground">
            Total Scholars
          </h3>
          <p className="text-4xl font-bold text-primary mt-2">--</p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow border border-border">
          <h3 className="text-lg font-medium text-muted-foreground">
            Total Articles
          </h3>
          <p className="text-4xl font-bold text-primary mt-2">--</p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow border border-border">
          <h3 className="text-lg font-medium text-muted-foreground">Drafts</h3>
          <p className="text-4xl font-bold text-secondary mt-2">--</p>
        </div>
      </div>
      <div className="mt-8">
        <p className="text-muted-foreground">
          Select a section from the sidebar to manage content.
        </p>
      </div>
    </div>
  );
}
