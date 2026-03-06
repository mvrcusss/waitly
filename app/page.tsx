"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ChefHat, Search, Clock, Heart } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-radial from-white dark:from-gray-800 to-gray-200 dark:to-gray-900">
      <div className="w-full max-w-6xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <div className="p-4 bg-primary/10 rounded-full">
              <ChefHat className="w-16 h-16 text-primary" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl sm:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-foreground/60 font-bold"
          >
            Meal Searcher
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Discover delicious recipes from around the world. Search for meals, explore ingredients,
            and get cooking instructions—all in one beautiful, intuitive interface.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/dashboard">
              <Button size="lg" className="text-lg px-8 py-3">
                <Search className="w-5 h-5 mr-2" />
                Start Searching
              </Button>
            </Link>
            <Link href="/changelog">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                <Clock className="w-5 h-5 mr-2" />
                View Updates
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          >
            <div className="bg-card/50 backdrop-blur-sm border rounded-xl p-6 text-center">
              <Search className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Instant Search</h3>
              <p className="text-muted-foreground">
                Search for meals as you type with real-time results and smooth animations.
              </p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border rounded-xl p-6 text-center">
              <ChefHat className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Detailed Recipes</h3>
              <p className="text-muted-foreground">
                Get complete ingredient lists with measurements and step-by-step instructions.
              </p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border rounded-xl p-6 text-center">
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Beautiful Design</h3>
              <p className="text-muted-foreground">
                Enjoy a modern, responsive interface with smooth transitions and dark mode support.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}