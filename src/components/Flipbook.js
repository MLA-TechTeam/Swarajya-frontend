// npm install react-pdf react-pageflip pdfjs-dist@4.8.69
// cp node_modules/pdfjs-dist/legacy/build/pdf.worker.min.mjs public/

import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";

// Set the worker file from `pdfjs-dist`
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const Flipbook = () => {
  const pdfFile = "/assets/events_2024-25.pdf";
  const [numPages, setNumPages] = useState(null);

  return (
    <div className="flex justify-center items-center mt-5 px-4 sm:px-0 w-full">
      <Document
        file={pdfFile}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        className="flex justify-center"
      >
        {numPages && (
          <HTMLFlipBook
            width={Math.min(650, window.innerWidth * 0.9)} // 90% width on small screens
            height={(Math.min(650, window.innerWidth * 0.9) * 1.4)} // Maintain aspect ratio
            showCover={true}
            className="shadow-lg border border-gray-300 w-full max-w-[90vw] sm:max-w-[500px]"
          >
            {Array.from({ length: numPages }, (_, index) => (
              <div
                key={index}
                className="flex justify-center items-center text-2xl font-bold bg-white shadow-md border border-gray-300"
              >
                <Page 
                  pageNumber={index + 1} 
                  width={Math.min(650, window.innerWidth * 0.9)} // Adjust dynamically 
                />
              </div>
            ))}
          </HTMLFlipBook>
        )}
      </Document>
    </div>
  );
};

export default Flipbook;
