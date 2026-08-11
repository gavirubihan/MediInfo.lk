/**
 * useCloudinaryUpload
 *
 * Reusable hook that handles:
 *  1. Converting any image File to WebP via the Canvas API.
 *  2. Uploading the converted blob to Cloudinary using an unsigned preset.
 *
 * Returns { upload, uploading, progress, error }.
 */

'use client';

import { useState, useCallback } from 'react';

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? '';
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? '';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Convert any image File to a WebP File via an off-screen Canvas. */
async function convertToWebP(file: File, quality = 0.85): Promise<File> {
  if (!file.type.startsWith('image/')) return file; // Non-image files pass through

  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(file);
        return;
      }

      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const baseName = file.name.replace(/\.[^/.]+$/, '');
            resolve(new File([blob], `${baseName}.webp`, { type: 'image/webp' }));
          } else {
            resolve(file); // Fallback: send original if conversion fails
          }
        },
        'image/webp',
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(file); // Fallback on load error
    };

    img.src = objectUrl;
  });
}

// ─── Hook ────────────────────────────────────────────────────────────────────

interface UploadResult {
  secureUrl: string;
  publicId: string;
}

interface UseCloudinaryUploadReturn {
  /** Upload a file to Cloudinary. Returns the secure URL and publicId. */
  upload: (file: File, folder?: string) => Promise<UploadResult>;
  uploading: boolean;
  progress: number;       // 0–100
  error: string | null;
  reset: () => void;
}

export function useCloudinaryUpload(): UseCloudinaryUploadReturn {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setUploading(false);
    setProgress(0);
    setError(null);
  }, []);

  const upload = useCallback(async (file: File, folder?: string): Promise<UploadResult> => {
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      throw new Error(
        'Cloudinary is not configured. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in your .env.local.'
      );
    }

    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      // Step 1: Convert to WebP
      setProgress(10);
      const webpFile = await convertToWebP(file);

      // Step 2: Upload to Cloudinary via XHR so we can track progress
      const formData = new FormData();
      formData.append('file', webpFile);
      formData.append('upload_preset', UPLOAD_PRESET);
      if (folder) {
        formData.append('folder', folder);
      }

      const result = await new Promise<UploadResult>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`);

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const pct = Math.round((event.loaded / event.total) * 80) + 20; // 20–100%
            setProgress(pct);
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            resolve({ secureUrl: data.secure_url, publicId: data.public_id });
          } else {
            reject(new Error(`Cloudinary upload failed (${xhr.status}): ${xhr.responseText}`));
          }
        };

        xhr.onerror = () => reject(new Error('Network error during upload.'));
        xhr.send(formData);
      });

      setProgress(100);
      return result;
    } catch (err: any) {
      const message = err.message ?? 'Upload failed.';
      setError(message);
      throw new Error(message);
    } finally {
      setUploading(false);
    }
  }, []);

  return { upload, uploading, progress, error, reset };
}
