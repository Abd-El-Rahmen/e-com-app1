import React, { useEffect, useRef } from "react";
import { Upload, BookmarkCheck, Trash } from "lucide-react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { editProduct } from "../../store/admin/productSlice";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  url,
  setUrl,
  imageLoadingState,
  setImageLoadingState,
  isEditMode,
}) => {
  const inputRef = useRef(null);

  const handleImageFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  };
  const handleRemoveImageFile = () => {
    setImageFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleOnDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  };

  async function uploadImage() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("image", imageFile);
    const response = await axios.post(
      "http://localhost:3000/api/admin/products/upload-image",
      data
    );
    if (response?.data?.success) {
      setUrl(response.data.result.url);
      setImageLoadingState(false);
      console.log(response.data.result.url);
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImage();
  }, [imageFile]);

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleOnDrop}
      className="w-full max-w-md mx-auto mb-6"
    >
      <label className="text-lg font-semibold mb-2 block text-gray-800 cursor-pointer">
        Upload Image
      </label>
      <input
        ref={inputRef}
        onChange={handleImageFileChange}
        type="file"
        accept="image/*"
        className="hidden"
        id="image-upload"
        disabled = {isEditMode}
      />

      {!imageFile ? (
        <label
          htmlFor="image-upload"
          className={`flex flex-col text-center m-2 gap-x-2  border-2 rounded-2xl border-gray-300 p-5   ${
            !isEditMode ? "cursor-pointer hover:border-gray-500" : "opacity-50 "
          }`}
        >
          <Upload size={50} className="self-center mb-2" />
          <p className="text-sm text-gray-500 mt-1">
            Drag & Drop or click here
          </p>
        </label>
      ) : imageLoadingState ? (
        <Skeleton className="h-14 bg-gray-200 " />
      ) : (
        <div className="flex  items-center justify-between m-2 gap-x-2  border-2 rounded-2xl border-black p-5 ">
          <BookmarkCheck size={40} color="green" />
          <p className="text-sm text-gray-500 mt-1">File is uploaded</p>
          <div>
            <div aria-label="Remove image">
              <Trash
                className="text-red-500 cursor-pointer hover:text-red-600 "
                size={25}
                onClick={handleRemoveImageFile}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageUpload;
