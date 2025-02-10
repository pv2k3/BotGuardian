import { Card, CardContent } from "@/components/ui/card";
import { BotAnalysis } from "@/components/BotAnalysis";
import { TwitterForm } from "@/components/TwitterForm";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [selectedHandle, setSelectedHandle] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Bot Detection System</h1>
          <p className="text-muted-foreground mb-8">
            Analyze Twitter accounts to detect automated behavior and bot patterns
          </p>

          <div className="grid gap-8">
            <Card>
              <CardContent className="pt-6">
                <TwitterForm onSubmit={setSelectedHandle} />
              </CardContent>
            </Card>

            {selectedHandle && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <BotAnalysis handle={selectedHandle} />
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
