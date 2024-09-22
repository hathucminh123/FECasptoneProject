import React, { useState } from 'react';
import { Dialog, DialogContent } from '@mui/material';

interface ImagePreviewProps {
  file: File;
  index: number;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ file, index }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false); 

  // Tạo URL cho ảnh
  React.useEffect(() => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    return () => {
      URL.revokeObjectURL(url); 
    };
  }, [file]);

  // Xử lý mở và đóng modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!imageUrl) return null;

  return (
    <>
   
      <img
        src={imageUrl}
        alt={`preview-${index}`}
        style={{
          width: "100%",
          height: "100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "50%",
          backgroundSize: "cover",
          borderRadius: "4px",
          border: "1px solid var(--neutral-300, #d7dee4)",
          boxSizing: "border-box",
          display: "block",
          cursor: "pointer", 
        }}
        onClick={handleClickOpen}
      />

      {/* Modal hiển thị hình ảnh lớn */}
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogContent>
          <img
            src={imageUrl}
            alt={`large-preview-${index}`}
            style={{
              width: "100%", 
              height: "auto",
              borderRadius: "4px",
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImagePreview;
