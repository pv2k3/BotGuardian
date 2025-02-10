import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalysisCharts } from "./AnalysisCharts";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { mockAnalyzeAccount } from "@/lib/mockData";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BotAnalysisProps {
  handle: string;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function BotAnalysis({ handle }: BotAnalysisProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    // Simulate API call with mock data
    setTimeout(() => {
      try {
        const result = mockAnalyzeAccount(handle);
        setData(result);
        setLoading(false);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to analyze account. Please try again.",
          variant: "destructive",
        });
        setLoading(false);
      }
    }, 2000);
  }, [handle, toast]);

  if (loading) {
    return (
      <motion.div 
        className="space-y-4"
        initial="hidden"
        animate="show"
        variants={fadeIn}
      >
        <Skeleton className="h-[200px] w-full bg-card/50" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-[300px] bg-card/50" />
          <Skeleton className="h-[300px] bg-card/50" />
        </div>
      </motion.div>
    );
  }

  const scoreColor =
    data.botScore < 30
      ? "text-green-500"
      : data.botScore < 70
      ? "text-yellow-500"
      : "text-red-500";

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className="space-y-4"
        variants={fadeIn}
        initial="hidden"
        animate="show"
      >
        <Card className="backdrop-blur-sm bg-card/50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                Analysis Results for @{handle}
              </motion.span>
              <motion.span
                className={`text-2xl font-bold ${scoreColor}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {data.botScore}% Bot Likelihood
              </motion.span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Progress
                value={data.botScore}
                className={`h-2 ${
                  data.botScore < 30
                    ? "bg-green-100/20"
                    : data.botScore < 70
                    ? "bg-yellow-100/20"
                    : "bg-red-100/20"
                }`}
              />
            </motion.div>
            <motion.div 
              className="mt-4 text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {data.summary}
            </motion.div>
          </CardContent>
        </Card>

        <AnalysisCharts data={data} />
      </motion.div>
    </AnimatePresence>
  );
}