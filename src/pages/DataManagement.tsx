import { useState, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Upload,
  FileText,
  CheckCircle,
  Database,
  AlertCircle
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  getUsers,
  getRecyclingHistory,
  importUsersFromCSV,
  importHistoryFromCSV,
} from "@/lib/localAuth";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const DataManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const usersFileRef = useRef<HTMLInputElement>(null);
  const historyFileRef = useRef<HTMLInputElement>(null);
  const [importStats, setImportStats] = useState<{ users: number; history: number } | null>(null);


  const handleImportUsers = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const count = importUsersFromCSV(content);
      setImportStats(prev => ({ users: count, history: prev?.history || 0 }));
      toast({
        title: "Import successful",
        description: `${count} users imported from CSV.`,
      });
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleImportHistory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const count = importHistoryFromCSV(content);
      setImportStats(prev => ({ users: prev?.users || 0, history: count }));
      toast({
        title: "Import successful",
        description: `${count} recycling records imported from CSV.`,
      });
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="card-elevated rounded-2xl p-12">
              <div className="w-16 h-16 rounded-full bg-emerald-light flex items-center justify-center mx-auto mb-6">
                <Database className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-3">
                Sign In to Manage Data
              </h1>
              <p className="text-muted-foreground mb-8">
                Export your recycling data to CSV or import existing data.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/sign-in">
                  <Button size="lg" className="rounded-full px-8">
                    Sign In
                  </Button>
                </Link>
                <Link to="/get-started">
                  <Button size="lg" variant="outline" className="rounded-full px-8">
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 bg-emerald-light text-primary rounded-full text-sm font-medium mb-4">
              Data Management
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Export & Import Data
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Download your data as CSV files or import existing data
            </p>
          </div>

          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground text-sm mb-1">Local Storage</p>
              <p className="text-sm text-muted-foreground">
                Your data is stored in your browser's local storage. Export regularly to backup your data.
                Clearing browser data will delete all stored information.
              </p>
            </div>
          </div>

          {/* Import Stats */}
          {importStats && (
            <div className="bg-emerald-light border border-primary/20 rounded-xl p-4 mb-8 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground text-sm">Last Import</p>
                <p className="text-sm text-muted-foreground">
                  {importStats.users} users and {importStats.history} recycling records imported.
                </p>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">

            {/* Import Section */}
            <div className="card-elevated rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Upload className="w-5 h-5 text-blue-500" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Import Data</h2>
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                Import data from previously exported CSV files.
              </p>

              <div className="space-y-3">
                <input
                  type="file"
                  ref={usersFileRef}
                  accept=".csv"
                  onChange={handleImportUsers}
                  className="hidden"
                />
                <Button
                  onClick={() => usersFileRef.current?.click()}
                  variant="outline"
                  className="w-full justify-start gap-3"
                >
                  <FileText className="w-4 h-4" />
                  Import Users (CSV)
                </Button>

                <input
                  type="file"
                  ref={historyFileRef}
                  accept=".csv"
                  onChange={handleImportHistory}
                  className="hidden"
                />
                <Button
                  onClick={() => historyFileRef.current?.click()}
                  variant="outline"
                  className="w-full justify-start gap-3"
                >
                  <FileText className="w-4 h-4" />
                  Import Recycling History (CSV)
                </Button>
              </div>
            </div>
          </div>

          {/* CSV Format Info */}
          <div className="mt-8 card-elevated rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">CSV Format Reference</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="font-medium text-sm text-foreground mb-2">Users CSV Columns:</p>
                <code className="text-xs text-muted-foreground block bg-muted p-3 rounded-lg">
                  id, email, displayName, carbonCredits, devicesRecycled, createdAt, updatedAt
                </code>
              </div>
              <div>
                <p className="font-medium text-sm text-foreground mb-2">Recycling History CSV Columns:</p>
                <code className="text-xs text-muted-foreground block bg-muted p-3 rounded-lg">
                  id, userId, deviceType, deviceName, creditsEarned, facilityName, recycledAt
                </code>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DataManagement;
