import React, { useState } from 'react';

interface CSVUploadFormProps {
  onSubmit: (file: File) => void;
}

export const CSVUploadForm: React.FC<CSVUploadFormProps> = ({ onSubmit }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      setIsLoading(true);
      setError(null);
      setAnalysisResult(null);

      try {
        const response = await fetch('http://localhost:8000/user-handle/', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          console.log('File uploaded successfully:', result);
          setAnalysisResult(result.analysis); // Assuming the result contains an 'analysis' field
          onSubmit(selectedFile);
        } else {
          console.error('File upload failed:', response.statusText);
          setError('File upload failed: ' + response.statusText);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        setError('Error analyzing Twitter handle: ' + (error as Error).message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
        />
        {selectedFile && (
          <p className="text-sm text-gray-500">Selected file: {selectedFile.name}</p>
        )}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? 'Uploading...' : 'Upload CSV'}
        </button>
      </form>
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
};