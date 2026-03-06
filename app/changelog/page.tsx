"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, ChefHat, Search, Sparkles } from "lucide-react";

interface UpdateEntry {
  version: string;
  date: string;
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
}

const updates: UpdateEntry[] = [
  {
    version: "1.0.0",
    date: "March 6, 2026",
    title: "Enhanced User Experience and Interface Improvements",
    description: "Major overhaul of the user interface with new features and improved design elements. This update focuses on enhancing the UX with smoother interactions. We are aware of the issues with getting meal data and ingredients and are working on a fix.",
    features: [
      "Added modal dialogs for detailed recipe views",
      "Implemented real-time search with debounced input",
      "Added loading spinners and smooth animations",
      "Improved responsive design for all devices",
      "Enhanced visual aesthetics with gradients and shadows",
      "Optimized performance for faster load times",
      "Fixed bugs and improved stability",
      "Added a new filter by type to make it easier to find meals"
    ],
    icon: <Sparkles className="w-6 h-6" />
  }
];

export default function ChangelogPage() {
  return (
    <main className="min-h-screen bg-radial from-white dark:from-gray-800 to-gray-200 dark:to-gray-900 py-8">
      <div className="w-full max-w-4xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <Link href="https://mealplanner-cc.betteruptime.com/">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                View Downtimes and Incidents
              </Button>
            </Link>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
              Update Log
            </h1>
          </div>

          <div className="space-y-8">
            {updates.map((update, index) => (
              <motion.div
                key={update.version}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card/50 backdrop-blur-sm border rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    {update.icon}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold">{update.title}</h2>
                      <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                        v{update.version}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{update.date}</span>
                    </div>
                    <p className="text-muted-foreground">{update.description}</p>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-foreground">What's New:</h3>
                      <ul className="space-y-1">
                        {update.features.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (index * 0.1) + (featureIndex * 0.05) }}
                            className="flex items-center gap-2 text-sm"
                          >
                            <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center py-8"
          >
            <Link href="/dashboard">
              <Button size="lg">
                <ChefHat className="w-5 h-5 mr-2" />
                Try the Latest Features
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}