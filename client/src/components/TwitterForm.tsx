import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/Loader"; // Assuming you have a Loader component

const formSchema = z.object({
  handle: z
    .string()
    .min(1, "Twitter handle is required")
    .regex(/^[A-Za-z0-9_]{1,15}$/, "Invalid Twitter handle format"),
});

interface TwitterFormProps {
  onSubmit: (handle: string) => void;
}

export function TwitterForm({ onSubmit }: TwitterFormProps) {
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      handle: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    try {
      const response = await fetch('http://localhost:8000/user-handle/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ handle: values.handle }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Analysis result:', result);
        setAnalysisResult(result.analysis); // Assuming the result contains an 'analysis' field
        onSubmit(values.handle);
      } else {
        console.error('Analysis failed:', response.statusText);
        setError('Analysis failed: ' + response.statusText);
      }
    } catch (error) {
      console.error('Error analyzing Twitter handle:', error);
      setError('Error analyzing Twitter handle: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="handle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Twitter Handle</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-2.5 text-muted-foreground">
                        @
                      </span>
                      <Input className="pl-7" placeholder="username" {...field} />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? <Loader /> : 'Analyze'}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          <h2 className="text-lg font-semibold">Error</h2>
          <p>{error}</p>
        </div>
      )}
      {analysisResult && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h2 className="text-lg font-semibold">Analysis Result</h2>
          <p>{analysisResult}</p>
        </div>
      )}
    </div>
  );
}