
// import React, { useRef } from "react";

// import html2pdf from "html2pdf.js";

// const ViewInvoice = () => {
//   const printRef = useRef();

//   // ✅ Print only the invoice section
//   const handlePrint = () => {
//     const printContents = printRef.current.innerHTML;
//     const printWindow = window.open("", "", "height=700,width=900");

//     if (printWindow) {
//       printWindow.document.write(`
//         <html>
//           <head>
//             <title>Print Invoice</title>
//             <style>
//               @page { size: auto; margin: 15mm; }
//               body {
//                 font-family: 'Arial', sans-serif;
//                 margin: 0;
//                 padding: 20px;
//                 background: #fff;
//                 color: #1f2937;
//               }
//               table {
//                 width: 100%;
//                 border-collapse: collapse;
//               }
//               th, td {
//                 border: 1px solid #e5e7eb;
//                 padding: 8px 12px;
//                 text-align: left;
//               }
//               th {
//                 background-color: #f3f4f6;
//               }
//               .text-right { text-align: right; }
//               .font-bold { font-weight: 600; }
//               .text-green { color: #10b981; }
//               .text-red { color: #ef4444; }
//               .space-y-1 > * + * { margin-top: 0.25rem; }
//               .space-y-2 > * + * { margin-top: 0.5rem; }
//               .mb-4 { margin-bottom: 1rem; }
//             </style>
//           </head>
//           <body>
//             ${printContents}
//           </body>
//         </html>
//       `);

//       printWindow.document.close();
//       const interval = setInterval(() => {
//         if (printWindow.document.readyState === "complete") {
//           clearInterval(interval);
//           printWindow.focus();
//           printWindow.print();
//         }
//       }, 100);
//     } else {
//       alert("Please allow popups for this site to print the invoice.");
//     }
//   };

//   // ✅ Download as PDF (html2pdf.js)
//   const handleDownload = () => {
//     try {
//       const element = printRef.current;
//       const opt = {
//         margin: 0.5,
//         filename: "invoice.pdf",
//         image: { type: "jpeg", quality: 0.98 },
//         html2canvas: { scale: 2 },
//         jsPDF: { unit: "in", format: [8.27, 13], orientation: "portrait" }, 
//       };
//       html2pdf().from(element).set(opt).save();
//     } catch (error) {
//       console.error("Error downloading PDF:", error);
//     }
//   };

//   return (
//     <div className="bg-white p-4 sm:p-6 max-w-5xl mx-auto">
//         {/* Top Buttons */}
//       <div className="flex justify-end gap-2 mb-4 pb-6 sm:pb-8">
//         <button
//           className="flex items-center gap-2 font-semibold bg-green-500 hover:bg-blue-400 text-white px-4 sm:px-6 py-2 rounded text-sm sm:text-base w-full sm:w-auto"
//           onClick={handlePrint}
//         >
//           Print
//         </button>
//         <button
//           className="flex items-center gap-2 font-semibold bg-blue-500 hover:bg-blue-400 text-white px-4 sm:px-6 py-2 rounded text-sm sm:text-base w-full sm:w-auto"
//           onClick={handleDownload}
//         >
//           Download
//         </button>
//       </div>

//       {/* Invoice Content */}
//       <div ref={printRef} className="print-content space-y-8 sm:space-y-14">

//       <div className="font-bold text-xl sm:text-2xl md:text-3xl flex justify-center">INVOICE</div>
//         {/* Billing Section */}
//         <div className="flex flex-col lg:flex-row justify-between mb-4 gap-4 sm:gap-6">
//           <div className="space-y-1">
//             <h3 className="font-bold text-sm sm:text-base">Billing From:</h3>
//             <p className="font-bold text-base sm:text-lg">Super Technologies</p>
//             <p className="text-sm sm:text-base"><span className="font-bold pe-1">Email:</span> contact@example.com</p>
//             <p className="text-sm sm:text-base"><span className="font-bold pe-1">Address:</span> 2972 Westheimer Rd. Santa Ana.</p>
//           </div>
//           <div className="space-y-1">
//             <h3 className="font-bold text-sm sm:text-base">Billing To:</h3>
//             <p className="font-bold text-base sm:text-lg">Devid Wilium</p>
//             <p className="text-sm sm:text-base"><span className="font-bold pe-1">Email:</span> contact@example.com</p>
//             <p className="text-sm sm:text-base"><span className="font-bold pe-1">Address:</span> New York, USA 2707 Davis Avenue</p>
//           </div>
//         </div>

//         {/* Invoice Details */}
//         <div className="overflow-x-auto">
//           <table className="w-full border min-w-[600px]">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="p-2 text-xs sm:text-sm">Invoice ID :</th>
//                 <th className="p-2 text-xs sm:text-sm">Date Issued :</th>
//                 <th className="p-2 text-xs sm:text-sm">Due Date :</th>
//                 <th className="p-2 text-xs sm:text-sm">Due Amount :</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr className="text-center">
//                 <td className="p-2 text-xs sm:text-sm">#STKB304398239</td>
//                 <td className="p-2 text-xs sm:text-sm">29, Nov 2027</td>
//                 <td className="p-2 text-xs sm:text-sm">29, Dec 2027</td>
//                 <td className="p-2 text-xs sm:text-sm">$2,578.90</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         {/* Items Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full my-4 border min-w-[600px]">
//             <thead>
//               <tr className="bg-gray-100 border-b">
//                 <th className="p-3 sm:p-4 text-left text-xs sm:text-sm">Brand name</th>
//                 <th className="p-3 sm:p-4 text-left text-xs sm:text-sm">Description</th>
//                 <th className="p-3 sm:p-4 text-left text-xs sm:text-sm">Quantity</th>
//                 <th className="p-3 sm:p-4 text-left text-xs sm:text-sm">Price Per Unit</th>
//                 <th className="p-3 sm:p-4 text-left text-xs sm:text-sm">Total</th>
//               </tr>
//             </thead>
//             <tbody className="border">
//               <tr className="border">
//                 <td className="p-3 sm:p-4 text-xs sm:text-sm">Techno</td>
//                 <td className="p-3 sm:p-4 text-xs sm:text-sm">Kemon 24 smart phone</td>
//                 <td className="p-3 sm:p-4 text-xs sm:text-sm">1</td>
//                 <td className="p-3 sm:p-4 text-xs sm:text-sm">$200</td>
//                 <td className="p-3 sm:p-4 text-xs sm:text-sm">$200</td>
//               </tr>
//               <tr className="border-b">
//                 <td className="p-3 sm:p-4 text-xs sm:text-sm">Vivo</td>
//                 <td className="p-3 sm:p-4 text-xs sm:text-sm">Vivo 32 smart phone</td>
//                 <td className="p-3 sm:p-4 text-xs sm:text-sm">3</td>
//                 <td className="p-3 sm:p-4 text-xs sm:text-sm">$300</td>
//                 <td className="p-3 sm:p-4 text-xs sm:text-sm">$900</td>
//               </tr>
//               <tr className="border-b">
//                 <td className="p-3 sm:p-4 text-xs sm:text-sm">Samsung</td>
//                 <td className="p-3 sm:p-4 text-xs sm:text-sm">S25 Ultra</td>
//                 <td className="p-3 sm:p-4 text-xs sm:text-sm">1</td>
//                 <td className="p-3 sm:p-4 text-xs sm:text-sm">$1300</td>
//                 <td className="p-3 sm:p-4 text-xs sm:text-sm">$1300</td>
//               </tr>
//               <tr className="border-b">
//                 <td className="p-3 sm:p-4 text-xs sm:text-sm">Apple</td>
//                 <td className="p-3 sm:p-4 text-xs sm:text-sm">iPhone 17 Pro Max</td>
//                 <td className="p-3 sm:p-4 text-xs sm:text-sm">2</td>
//                 <td className="p-3 sm:p-4 text-xs sm:text-sm">$1200</td>
//                 <td className="p-3 sm:p-4 text-xs sm:text-sm">$2400</td>
//               </tr>
//               <tr className="border-b">
//                 <td className="p-3 sm:p-4 text-xs sm:text-sm">Oppo</td>
//                 <td className="p-3 sm:p-4 text-xs sm:text-sm">Fold X</td>
//                 <td className="p-3 sm:p-4 text-xs sm:text-sm">1</td>
//                 <td className="p-3 sm:p-4 text-xs sm:text-sm">$900</td>
//                 <td className="p-3 sm:p-4 text-xs sm:text-sm">$900</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         {/* Summary */}
//         <div className="flex justify-end mt-2">
//           <div className="text-right space-y-1">
//             <p className="text-sm sm:text-base"><span className="font-bold">Subtotal</span> $4700</p>
//             <p className="text-sm sm:text-base"><span className="font-bold">Shipping Cost (+)</span> $10.00</p>
//             <p className="text-sm sm:text-base"><span className="font-bold">Coupon Discount(10%)</span> $470</p>
//             <p className="text-sm sm:text-base"><span className="font-bold">Vat (5%)</span> $235</p>
//             <p className="text-base sm:text-xl"><span className="font-bold">Total : </span>$4475</p>
//           </div>
//         </div>

//         {/* Download Button */}
//         {/* <div className="flex justify-center my-2 py-4">
//           <button
//             className="hover:bg-purple-500 font-semibold bg-sky-400 text-white px-4 py-2 rounded flex items-center text-sm sm:text-base w-full sm:w-auto"
//             onClick={handleDownload}
//           >
//             Download
//           </button>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default ViewInvoice;

import React, { useRef } from "react";
import html2pdf from "html2pdf.js";

const ViewInvoice = () => {
  const printRef = useRef();

  // ✅ Print only the invoice section
  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const printWindow = window.open("", "", "height=700,width=900");

    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Invoice</title>
            <style>
              @page { size: auto; margin: 15mm; }
              body {
                font-family: 'Arial', sans-serif;
                margin: 0;
                padding: 20px;
                background: #fff;
                color: #1f2937;
              }
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                border: 1px solid #e5e7eb;
                padding: 8px 12px;
                text-align: left;
              }
              th {
                background-color: #f3f4f6;
              }
              .text-right { text-align: right; }
              .font-bold { font-weight: 600; }
              .space-y-1 > * + * { margin-top: 0.25rem; }
              .space-y-2 > * + * { margin-top: 0.5rem; }
              .mb-4 { margin-bottom: 1rem; }
            </style>
          </head>
          <body>
            ${printContents}
          </body>
        </html>
      `);

      printWindow.document.close();
      const interval = setInterval(() => {
        if (printWindow.document.readyState === "complete") {
          clearInterval(interval);
          printWindow.focus();
          printWindow.print();
        }
      }, 100);
    } else {
      alert("Please allow popups for this site to print the invoice.");
    }
  };

  // ✅ Download as PDF (html2pdf.js)
  const handleDownload = () => {
    try {
      const element = printRef.current;

      const opt = {
        margin: 0.3, 
        filename: "invoice.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: [8.27, 13], orientation: "portrait" }, 
      };

      html2pdf().from(element).set(opt).save();
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <div className="bg-white text-black p-4 sm:p-6 max-w-5xl mx-auto">
        
      {/* Top Buttons */}
      <div className="flex justify-end gap-2 mb-4 pb-6 sm:pb-8">
        <button
          className="flex items-center gap-2 font-semibold bg-green-500 hover:bg-blue-400 text-white px-4 sm:px-6 py-2 rounded text-sm sm:text-base w-full sm:w-auto"
          onClick={handlePrint}
        >
          Print
        </button>
        <button
          className="flex items-center gap-2 font-semibold bg-blue-500 hover:bg-blue-400 text-white px-4 sm:px-6 py-2 rounded text-sm sm:text-base w-full sm:w-auto"
          onClick={handleDownload}
        >
          Download
        </button>
      </div>

      {/* Invoice Content */}
      <div ref={printRef} className="print-content space-y-8 sm:space-y-14">

        <div className="font-bold text-xl sm:text-2xl md:text-3xl flex justify-center">
          INVOICE
        </div>

        {/* Billing Section */}
        <div className="flex flex-col lg:flex-row justify-between mb-4 gap-4 sm:gap-6">
          <div className="space-y-1">
            <h3 className="font-bold text-sm sm:text-base">Billing From:</h3>
            <p className="font-bold text-base sm:text-lg">Super Technologies</p>
            <p className="text-sm sm:text-base"><span className="font-bold pe-1">Email:</span> contact@example.com</p>
            <p className="text-sm sm:text-base"><span className="font-bold pe-1">Address:</span> 2972 Westheimer Rd. Santa Ana.</p>
          </div>

          <div className="space-y-1">
            <h3 className="font-bold text-sm sm:text-base">Billing To:</h3>
            <p className="font-bold text-base sm:text-lg">Devid Wilium</p>
            <p className="text-sm sm:text-base"><span className="font-bold pe-1">Email:</span> contact@example.com</p>
            <p className="text-sm sm:text-base"><span className="font-bold pe-1">Address:</span> New York, USA 2707 Davis Avenue</p>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="overflow-x-auto">
          <table className="w-full border min-w-[600px]">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-xs sm:text-sm">Invoice ID :</th>
                <th className="p-2 text-xs sm:text-sm">Date Issued :</th>
                <th className="p-2 text-xs sm:text-sm">Due Date :</th>
                <th className="p-2 text-xs sm:text-sm">Due Amount :</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td className="p-2 text-xs sm:text-sm">#STKB304398239</td>
                <td className="p-2 text-xs sm:text-sm">29, Nov 2027</td>
                <td className="p-2 text-xs sm:text-sm">29, Dec 2027</td>
                <td className="p-2 text-xs sm:text-sm">$2,578.90</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full my-4 border min-w-[600px]">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-3 sm:p-4 text-left text-xs sm:text-sm">Brand name</th>
                <th className="p-3 sm:p-4 text-left text-xs sm:text-sm">Description</th>
                <th className="p-3 sm:p-4 text-left text-xs sm:text-sm">Quantity</th>
                <th className="p-3 sm:p-4 text-left text-xs sm:text-sm">Price Per Unit</th>
                <th className="p-3 sm:p-4 text-left text-xs sm:text-sm">Total</th>
              </tr>
            </thead>

            <tbody className="border">
              <tr className="border">
                <td className="p-3 sm:p-4 text-xs sm:text-sm">Techno</td>
                <td className="p-3 sm:p-4 text-xs sm:text-sm">Kemon 24 smart phone</td>
                <td className="p-3 sm:p-4 text-xs sm:text-sm">1</td>
                <td className="p-3 sm:p-4 text-xs sm:text-sm">$200</td>
                <td className="p-3 sm:p-4 text-xs sm:text-sm">$200</td>
              </tr>

              <tr className="border-b">
                <td className="p-3 sm:p-4 text-xs sm:text-sm">Vivo</td>
                <td className="p-3 sm:p-4 text-xs sm:text-sm">Vivo 32 smart phone</td>
                <td className="p-3 sm:p-4 text-xs sm:text-sm">3</td>
                <td className="p-3 sm:p-4 text-xs sm:text-sm">$300</td>
                <td className="p-3 sm:p-4 text-xs sm:text-sm">$900</td>
              </tr>

              <tr className="border-b">
                <td className="p-3 sm:p-4 text-xs sm:text-sm">Samsung</td>
                <td className="p-3 sm:p-4 text-xs sm:text-sm">S25 Ultra</td>
                <td className="p-3 sm:p-4 text-xs sm:text-sm">1</td>
                <td className="p-3 sm:p-4 text-xs sm:text-sm">$1300</td>
                <td className="p-3 sm:p-4 text-xs sm:text-sm">$1300</td>
              </tr>

              <tr className="border-b">
                <td className="p-3 sm:p-4 text-xs sm:text-sm">Apple</td>
                <td className="p-3 sm:p-4 text-xs sm:text-sm">iPhone 17 Pro Max</td>
                <td className="p-3 sm:p-4 text-xs sm:text-sm">2</td>
                <td className="p-3 sm:p-4 text-xs sm:text-sm">$1200</td>
                <td className="p-3 sm:p-4 text-xs sm:text-sm">$2400</td>
              </tr>

              <tr className="border-b">
                <td className="p-3 sm:p-4 text-xs sm:text-sm">Oppo</td>
                <td className="p-3 sm:p-4 text-xs sm:text-sm">Fold X</td>
                <td className="p-3 sm:p-4 text-xs sm:text-sm">1</td>
                <td className="p-3 sm:p-4 text-xs sm:text-sm">$900</td>
                <td className="p-3 sm:p-4 text-xs sm:text-sm">$900</td>
              </tr>
            </tbody>

          </table>
        </div>

        {/* Summary */}
        <div className="flex justify-end mt-2">
          <div className="text-right space-y-1 avoid-break">
            <p className="text-sm sm:text-base"><span className="font-bold">Subtotal</span> $4700</p>
            <p className="text-sm sm:text-base"><span className="font-bold">Shipping Cost (+)</span> $10.00</p>
            <p className="text-sm sm:text-base"><span className="font-bold">Coupon Discount(10%)</span> $470</p>
            <p className="text-sm sm:text-base"><span className="font-bold">Vat (5%)</span> $235</p>
            <p className="text-base sm:text-xl font-bold"><span>Total : </span>$4475</p>
          </div>
        </div>

        {/* EXTRA BOTTOM SPACE → prevents PDF cutting */}
        <div style={{ height: "40px" }}></div>

      </div>
    </div>
  );
};

export default ViewInvoice;
