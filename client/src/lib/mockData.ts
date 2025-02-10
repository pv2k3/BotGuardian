interface AnalysisResult {
  botScore: number;
  summary: string;
  postingFrequency: Array<{ time: string; posts: number }>;
  engagement: Array<{ name: string; value: number }>;
}

export function mockAnalyzeAccount(handle: string): AnalysisResult {
  // Generate a deterministic but seemingly random score based on the handle
  const hash = handle.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const botScore = Math.min(100, Math.max(0, (hash % 100)));

  const getPostingFrequency = () => {
    const hours = ['12am', '4am', '8am', '12pm', '4pm', '8pm'];
    return hours.map(time => ({
      time,
      posts: Math.floor(Math.random() * 50),
    }));
  };

  const getEngagement = () => [
    { name: 'Organic', value: 35 + (hash % 20) },
    { name: 'Suspicious', value: 25 + (hash % 15) },
    { name: 'Automated', value: 15 + (hash % 25) },
  ];

  const getSummary = (score: number) => {
    if (score < 30) {
      return "This account shows natural posting patterns and engagement metrics typical of human users.";
    } else if (score < 70) {
      return "Some automated behavior detected. The account shows mixed patterns of both human and bot-like activity.";
    } else {
      return "High likelihood of automated behavior. Unusual posting patterns and engagement metrics detected.";
    }
  };

  return {
    botScore,
    summary: getSummary(botScore),
    postingFrequency: getPostingFrequency(),
    engagement: getEngagement(),
  };
}
