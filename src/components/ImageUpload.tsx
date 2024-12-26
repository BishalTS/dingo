import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Props {
  onImageUploaded: (url: string) => void;
  currentImageUrl?: string;
}

export function ImageUpload({ onImageUploaded, currentImageUrl }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null);

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);
      setError(null);

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `ticket-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('tickets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('tickets')
        .getPublicUrl(filePath);

      setPreview(publicUrl);
      onImageUploaded(publicUrl);
    } catch (error) {
      setError('Error uploading image. Please try again.');
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.[0]) return;
    uploadImage(event.target.files[0]);
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onImageUploaded('');
  };

  return (
    <div className="mt-4">
      {preview ? (
        <div className="relative inline-block">
          <img 
            src={preview} 
            alt="Ticket preview" 
            className="max-w-xs rounded-lg shadow-md"
          />
          <button
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            title="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div>
          <label className="block">
            <span className="sr-only">Choose ticket image</span>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 cursor-pointer">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500">
                    <span>Upload a file</span>
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={uploading}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </label>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
          {uploading && (
            <p className="mt-2 text-sm text-gray-600">Uploading...</p>
          )}
        </div>
      )}
    </div>
  );
}