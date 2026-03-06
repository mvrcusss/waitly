import { MealSearcher } from "@/components/meal-searcher";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-radial from-white dark:from-gray-800 to-gray-200 dark:to-gray-900 py-8">
      <MealSearcher />
    </main>
  );
}