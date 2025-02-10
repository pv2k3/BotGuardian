import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalysisCharts } from "./AnalysisCharts";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { mockAnalyzeAccount } from "@/lib/mockData";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface BotAnalysisProps {
  handle: string;
}

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
      <div className="space-y-4">
        <Skeleton className="h-[200px] w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-[300px]" />
          <Skeleton className="h-[300px]" />
        </div>
      </div>
    );
  }

  const scoreColor =
    data.botScore < 30
      ? "text-green-500"
      : data.botScore < 70
      ? "text-yellow-500"
      : "text-red-500";

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Analysis Results for @{handle}</span>
            <span className={`text-2xl font-bold ${scoreColor}`}>
              {data.botScore}% Bot Likelihood
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress
            value={data.botScore}
            className={`h-2 ${
              data.botScore < 30
                ? "bg-green-100"
                : data.botScore < 70
                ? "bg-yellow-100"
                : "bg-red-100"
            }`}
          />
          <div className="mt-4 text-muted-foreground">{data.summary}</div>
        </CardContent>
      </Card>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <AnalysisCharts data={data} />
      </motion.div>
    </div>
  );
}
