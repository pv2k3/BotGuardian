import { Card, CardContent } from "@/components/ui/card";
import { BotAnalysis } from "@/components/BotAnalysis";
import { TwitterForm } from "@/components/TwitterForm";
import { useState } from "react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Home() {
  const [selectedHandle, setSelectedHandle] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto"
      >
        <motion.h1 
          variants={item}
          className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text"
        >
          Bot Detection System
        </motion.h1>
        <motion.p 
          variants={item}
          className="text-muted-foreground mb-8"
        >
          Analyze Twitter accounts to detect automated behavior and bot patterns
        </motion.p>

        <motion.div variants={item}>
          <Card className="backdrop-blur-sm bg-card/50">
            <CardContent className="pt-6">
              <TwitterForm onSubmit={setSelectedHandle} />
            </CardContent>
          </Card>
        </motion.div>

        {selectedHandle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <BotAnalysis handle={selectedHandle} />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}