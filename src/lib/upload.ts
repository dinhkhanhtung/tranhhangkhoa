import { configStore } from "./config-store";
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface ImgBBResponse {
  data: {
    // ... rest of the interface
    url: string;
    // ...
  };
  success: boolean;
}

/**
 * Option 1: Upload to ImgBB (Third-party)
 * Simple, no config needed on Firebase.
 */
export const uploadImage = async (file: File): Promise<string | null> => {
  const settings = configStore.getSettings();
  const apiKey = settings.imgbb.apiKey || process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  const apiUrl = settings.imgbb.apiUrl || "https://api.imgbb.com/1/upload";

  if (!apiKey) {
    // Fallback to Firebase Storage if ImgBB is not configured
    if (storage) {
      console.log("ImgBB key missing, falling back to Firebase Storage...");
      return uploadToFirebase(file);
    }
    throw new Error("Vui lòng cấu hình ImgBB API Key hoặc Firebase Storage.");
  }

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(`${apiUrl}?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Lỗi khi tải ảnh lên ImgBB.");
    }

    const result: any = await response.json();
    return result.data.url;
  } catch (error) {
    console.error("ImgBB upload error:", error);
    // Final fallback to Firebase
    return uploadToFirebase(file);
  }
};

/**
 * Option 2: Upload to Firebase Storage (Included in Firebase)
 * More secure and integrated, but requires Storage bucket setup.
 */
export const uploadToFirebase = async (file: File): Promise<string | null> => {
  if (!storage) {
    throw new Error("Firebase Storage chưa được cấu hình.");
  }

  try {
    const storageRef = ref(storage, `uploads/${Date.now()}-${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Firebase Storage upload error:", error);
    throw new Error("Không thể tải ảnh lên Firebase Storage. Hãy kiểm tra lại cấu hình hoặc quyền truy cập.");
  }
};
