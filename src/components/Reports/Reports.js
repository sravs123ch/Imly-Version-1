
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import * as XLSX from 'xlsx';
// import { jsPDF } from 'jspdf';

// function ReportGenerator() {
//   const [activeTab, setActiveTab] = useState('salesReport');
//   const navigate = useNavigate();

//   const [salesReport, setSalesReport] = useState({
//     dateRange: { startDate: '', endDate: '' },
//     productCategory: '',
//     store: '', // Added store field
//   });

//   const [paymentReport, setPaymentReport] = useState({
//     dateRange: { startDate: '', endDate: '' },
//     productCategory: '',
//     store: '',
//   });

//   const [returnReport, setReturnReport] = useState({
//     dateRange: { startDate: '', endDate: '' },
//     productCategory: '',
//     store: '',
//   });

//   const [customerFeedback, setCustomerFeedback] = useState({
//     dateRange: { startDate: '', endDate: '' },
//     productCategory: '',
//     store: '',
//   });

//   const [generatedReport, setGeneratedReport] = useState(null);

//   const handleInputChange = (reportType, field, value) => {
//     if (reportType === 'salesReport') {
//       setSalesReport({ ...salesReport, [field]: value });
//     } else if (reportType === 'paymentReport') {
//       setPaymentReport({ ...paymentReport, [field]: value });
//     } else if (reportType === 'returnReport') {
//       setReturnReport({ ...returnReport, [field]: value });
//     } else if (reportType === 'customerFeedback') {
//       setCustomerFeedback({ ...customerFeedback, [field]: value });
//     }
//   };

//   const handleSubmit = (reportType) => {
//     if (reportType === 'salesReport') {
//       setGeneratedReport({ reportType: 'salesReport', data: salesReport });
//     } else if (reportType === 'paymentReport') {
//       setGeneratedReport({ reportType: 'paymentReport', data: paymentReport });
//     } else if (reportType === 'returnReport') {
//       setGeneratedReport({ reportType: 'returnReport', data: returnReport });
//     } else if (reportType === 'customerFeedback') {
//       setGeneratedReport({ reportType: 'customerFeedback', data: customerFeedback });
//     }
//   };

//   const exportToExcel = (reportType, data) => {
//     const dataArray = Array.isArray(data) ? data : [data];
//     const ws = XLSX.utils.json_to_sheet(dataArray);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, `${reportType} Report`);
//     XLSX.writeFile(wb, `${reportType}_report.xlsx`);
//   };

//   const exportToPDF = (reportType, data) => {
//     const dataArray = Array.isArray(data) ? data : [data];
//     const doc = new jsPDF();
//     doc.setFontSize(12);

//     doc.text(`${reportType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} Report`, 10, 10);

//     let yOffset = 20;
//     dataArray.forEach((report, index) => {
//       if (yOffset > 270) { // Check if page is full
//         doc.addPage();
//         yOffset = 10;
//       }
//       doc.text(`${index + 1}. ${JSON.stringify(report)}`, 10, yOffset);
//       yOffset += 10;
//     });

//     doc.save(`${reportType}_report.pdf`);
//   };

//   const renderTable = (data) => {
//     return (
//       <table className="min-w-full bg-white border border-gray-200 rounded-md mt-6">
//         <thead>
//           <tr>
//             <th className="border px-4 py-2">Field</th>
//             <th className="border px-4 py-2">Value</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td className="border px-4 py-2">Start Date</td>
//             <td className="border px-4 py-2">{data.dateRange.startDate}</td>
//           </tr>
//           <tr>
//             <td className="border px-4 py-2">End Date</td>
//             <td className="border px-4 py-2">{data.dateRange.endDate}</td>
//           </tr>
//           <tr>
//             <td className="border px-4 py-2">Product Category</td>
//             <td className="border px-4 py-2">{data.productCategory}</td>
//           </tr>
//           <tr>
//             <td className="border px-4 py-2">Store</td>
//             <td className="border px-4 py-2">{data.store}</td>
//           </tr>
//         </tbody>
//       </table>
//     );
//   };

//   return (
//     <div className="px-4 sm:px-6 lg:px-8 pt-4 ml-10 lg:ml-80 w-auto p-6 bg-white shadow-lg rounded-lg mt-10 mx-10 mb-10">
//       <h2 className="text-2xl font-bold mb-4">Report Generator</h2>

//       <div className="flex space-x-4 mb-6">
//         <button
//           onClick={() => setActiveTab('salesReport')}
//           className={`px-4 py-2 rounded-md ${activeTab === 'salesReport' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
//         >
//           Sales Report
//         </button>
//         <button
//           onClick={() => setActiveTab('paymentReport')}
//           className={`px-4 py-2 rounded-md ${activeTab === 'paymentReport' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
//         >
//           Payment Report
//         </button>
//         <button
//           onClick={() => setActiveTab('returnReport')}
//           className={`px-4 py-2 rounded-md ${activeTab === 'returnReport' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
//         >
//           Return Report
//         </button>
//         <button
//           onClick={() => setActiveTab('customerFeedback')}
//           className={`px-4 py-2 rounded-md ${activeTab === 'customerFeedback' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
//         >
//           Customer Feedback
//         </button>
//       </div>

//       {activeTab === 'salesReport' && (
//         <>
//           <div className="mb-8 ml-40">
//             <h3 className="text-xl font-semibold mb-4">Sales Report</h3>
//             <div className="grid grid-cols-1 gap-6">
//               <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
//                 <div className='flex gap-40'>
//                   <label className="text-xs mt-2 font-medium text-gray-700">Start Date:</label>
//                   <input
//                     type="date"
//                     value={salesReport.dateRange.startDate}
//                     onChange={(e) => handleInputChange('salesReport', 'dateRange', { ...salesReport.dateRange, startDate: e.target.value })}
//                     className="mt-1 p-1 w-1/3 border rounded-md"
//                   />
//                 </div>
//                 <div className='flex gap-40'>
//                   <label className="mt-2 text-xs font-medium text-gray-700">End Date</label>
//                   <input
//                     type="date"
//                     value={salesReport.dateRange.endDate}
//                     onChange={(e) => handleInputChange('salesReport', 'dateRange', { ...salesReport.dateRange, endDate: e.target.value })}
//                     className="mt-1 p-1 w-1/3 border rounded-md"
//                   />
//                 </div>
//                 <div className='flex gap-28'>
//                   <label className="mt-2 text-xs font-medium text-gray-700">Product Category</label>
//                   <select
//                     value={salesReport.productCategory}
//                     onChange={(e) => handleInputChange('salesReport', 'productCategory', e.target.value)}
//                     className="mt-1 p-1 w-1/3 border rounded-md"
//                   >
//                     <option value="">Select Category</option>
//                     {['Kitchen', 'Wardrobe', 'Both'].map((option, i) => (
//                       <option key={i} value={option}>
//                         {option}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className='flex gap-44'>
//                   <label className="mt-2 text-xs font-medium text-gray-700">Store</label>
//                   <select
//                     value={salesReport.store}
//                     onChange={(e) => handleInputChange('salesReport', 'store', e.target.value)}
//                     className="mt-1 p-1 w-1/3 border rounded-md"
//                   >
//                     <option value="">Select Store</option>
//                     {['HSR layout Imly store', 'JP nagar Imly store ', 'Jayanagar Imly store '].map((option, i) => (
//                       <option key={i} value={option}>
//                         {option}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex space-x-4">
//             <button
//               onClick={() => handleSubmit('salesReport')}
//               className="bg-custom-blue text-white px-4 py-2 rounded-md"
//             >
//               Generate Report
//             </button>
//             {generatedReport && generatedReport.reportType === 'salesReport' && (
//               <>
//                 <button
//                   onClick={() => exportToExcel('salesReport', generatedReport.data)}
//                   className="bg-custom-blue text-white px-4 py-2 rounded-md"
//                 >
//                   Export to Excel
//                 </button>
//                 <button
//                   onClick={() => exportToPDF('salesReport', generatedReport.data)}
//                   className="bg-red-500 text-white px-4 py-2 rounded-md"
//                 >
//                   Export to PDF
//                 </button>
//               </>
//             )}
//           </div>

//           {generatedReport && generatedReport.reportType === 'salesReport' && renderTable(generatedReport.data)}
//         </>
//       )}

//       {activeTab === 'paymentReport' && (
//         <>
//           <div className="mb-8 ml-40">
//             <h3 className="text-xl font-semibold mb-4">Payment Report</h3>
//             <div className="grid grid-cols-1 gap-6">
//               <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
//                 <div className='flex gap-40'>
//                   <label className="mt-2 text-xs font-medium text-gray-700">Start Date</label>
//                   <input
//                     type="date"
//                     value={paymentReport.dateRange.startDate}
//                     onChange={(e) => handleInputChange('paymentReport', 'dateRange', { ...paymentReport.dateRange, startDate: e.target.value })}
//                     className="mt-1 p-1 w-1/3 border rounded-md"
//                   />
//                 </div>
//                 <div className='flex gap-40'>
//                   <label className="block text-xs font-medium text-gray-700">End Date</label>
//                   <input
//                     type="date"
//                     value={paymentReport.dateRange.endDate}
//                     onChange={(e) => handleInputChange('paymentReport', 'dateRange', { ...paymentReport.dateRange, endDate: e.target.value })}
//                     className="mt p-1 w-1/3 border rounded-md"
//                   />
//                 </div>
//                 <div className='flex gap-28'>
//                   <label className="mt-2 text-xs font-medium text-gray-700">Product Category</label>
//                   <select
//                     value={paymentReport.productCategory}
//                     onChange={(e) => handleInputChange('paymentReport', 'productCategory', e.target.value)}
//                     className="mt-1 p-1 w-1/3 border rounded-md"
//                   >
//                     <option value="">Select Category</option>
//                     {['Kitchen', 'Wardrobe', 'Both'].map((option, i) => (
//                       <option key={i} value={option}>
//                         {option}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className='flex gap-44'>
//                   <label className="mt-2 text-xs font-medium text-gray-700">Store</label>
//                   <select
//                     value={paymentReport.store}
//                     onChange={(e) => handleInputChange('paymentReport', 'store', e.target.value)}
//                     className="mt-1 p-1 w-1/3 border rounded-md"
//                   >
//                     <option value="">Select Store</option>
//                     {['HSR layout Imly store', 'JP nagar Imly store ', 'Jayanagar Imly store '].map((option, i) => (
//                       <option key={i} value={option}>
//                         {option}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex space-x-4">
//             <button
//               onClick={() => handleSubmit('paymentReport')}
//               className="bg-custom-blue text-white px-4 py-2 rounded-md"
//             >
//               Generate Report
//             </button>
//             {generatedReport && generatedReport.reportType === 'paymentReport' && (
//               <>
//                 <button
//                   onClick={() => exportToExcel('paymentReport', generatedReport.data)}
//                   className="bg-custom-blue text-white px-4 py-2 rounded-md"
//                 >
//                   Export to Excel
//                 </button>
//                 <button
//                   onClick={() => exportToPDF('paymentReport', generatedReport.data)}
//                   className="bg-red-500 text-white px-4 py-2 rounded-md"
//                 >
//                   Export to PDF
//                 </button>
//               </>
//             )}
//           </div>

//           {generatedReport && generatedReport.reportType === 'paymentReport' && renderTable(generatedReport.data)}
//         </>
//       )}

//       {activeTab === 'returnReport' && (
//         <>
//           <div className="mb-8 ml-40">
//             <h3 className="text-xl font-semibold mb-4">Return Report</h3>
//             <div className="grid grid-cols-1 gap-6">
//               <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
//                 <div className='flex gap-40'>
//                   <label className="mt-2 text-xs font-medium text-gray-700">Start Date</label>
//                   <input
//                     type="date"
//                     value={returnReport.dateRange.startDate}
//                     onChange={(e) => handleInputChange('returnReport', 'dateRange', { ...returnReport.dateRange, startDate: e.target.value })}
//                     className="mt-1 p-1 w-1/3 border rounded-md"
//                   />
//                 </div>
//                 <div className='flex gap-40'>
//                   <label className="mt-2 text-xs font-medium text-gray-700">End Date</label>
//                   <input
//                     type="date"
//                     value={returnReport.dateRange.endDate}
//                     onChange={(e) => handleInputChange('returnReport', 'dateRange', { ...returnReport.dateRange, endDate: e.target.value })}
//                     className="mt-1 p-1 w-1/3 border rounded-md"
//                   />
//                 </div>
//                 <div className='flex gap-28'>
//                   <label className="mt-2 text-xs font-medium text-gray-700">Product Category</label>
//                   <select
//                     value={returnReport.productCategory}
//                     onChange={(e) => handleInputChange('returnReport', 'productCategory', e.target.value)}
//                     className="mt-1 p-1 w-1/3 border rounded-md"
//                   >
//                     <option value="">Select Category</option>
//                     {['Kitchen', 'Wardrobe', 'Both'].map((option, i) => (
//                       <option key={i} value={option}>
//                         {option}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className='flex gap-44'>
//                   <label className="mt-2 text-xs font-medium text-gray-700">Store</label>
//                   <select
//                     value={returnReport.store}
//                     onChange={(e) => handleInputChange('returnReport', 'store', e.target.value)}
//                     className="mt-1 p-1 w-1/3 border rounded-md"
//                   >
//                     <option value="">Select Store</option>
//                     {['Store 1', 'Store 2', 'Store 3'].map((option, i) => (
//                       <option key={i} value={option}>
//                         {option}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex space-x-4">
//             <button
//               onClick={() => handleSubmit('returnReport')}
//               className="bg-custom-blue text-white px-4 py-2 rounded-md"
//             >
//               Generate Report
//             </button>
//             {generatedReport && generatedReport.reportType === 'returnReport' && (
//               <>
//                 <button
//                   onClick={() => exportToExcel('returnReport', generatedReport.data)}
//                   className="bg-custom-blue text-white px-4 py-2 rounded-md"
//                 >
//                   Export to Excel
//                 </button>
//                 <button
//                   onClick={() => exportToPDF('returnReport', generatedReport.data)}
//                   className="bg-red-500 text-white px-4 py-2 rounded-md"
//                 >
//                   Export to PDF
//                 </button>
//               </>
//             )}
//           </div>

//           {generatedReport && generatedReport.reportType === 'returnReport' && renderTable(generatedReport.data)}
//         </>
//       )}

//       {activeTab === 'customerFeedback' && (
//         <>
//           <div className="mb-8 ml-40">
//             <h3 className="text-xl font-semibold mb-4">Customer Feedback</h3>
//             <div className="grid grid-cols-1 gap-6">
//               <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
//                 <div className='flex gap-40'>
//                   <label className="mt-2 text-xs font-medium text-gray-700">Start Date</label>
//                   <input
//                     type="date"
//                     value={customerFeedback.dateRange.startDate}
//                     onChange={(e) => handleInputChange('customerFeedback', 'dateRange', { ...customerFeedback.dateRange, startDate: e.target.value })}
//                     className="mt-1 p-1 w-1/3 border rounded-md"
//                   />
//                 </div>
//                 <div className='flex gap-40'>
//                   <label className="mt-2 text-xs font-medium text-gray-700">End Date</label>
//                   <input
//                     type="date"
//                     value={customerFeedback.dateRange.endDate}
//                     onChange={(e) => handleInputChange('customerFeedback', 'dateRange', { ...customerFeedback.dateRange, endDate: e.target.value })}
//                     className="mt-1 p-1 w-1/3 border rounded-md"
//                   />
//                 </div>
//                 <div className='flex gap-28'>
//                   <label className="block text-xs font-medium text-gray-700">Product Category</label>
//                   <select
//                     value={customerFeedback.productCategory}
//                     onChange={(e) => handleInputChange('customerFeedback', 'productCategory', e.target.value)}
//                     className="mt-1 p-1 w-1/3 border rounded-md"
//                   >
//                     <option value="">Select Category</option>
//                     {['Kitchen', 'Wardrobe', 'Both'].map((option, i) => (
//                       <option key={i} value={option}>
//                         {option}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className='flex gap-44'>
//                   <label className="block text-xs font-medium text-gray-700">Store</label>
//                   <select
//                     value={customerFeedback.store}
//                     onChange={(e) => handleInputChange('customerFeedback', 'store', e.target.value)}
//                     className="mt-1 p-1 w-1/3 border rounded-md"
//                   >
//                     <option value="">Select Store</option>
//                     {['HSR layout Imly store', 'JP nagar Imly store ', 'Jayanagar Imly store '].map((option, i) => (
//                       <option key={i} value={option}>
//                         {option}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex space-x-4">
//             <button
//               onClick={() => handleSubmit('customerFeedback')}
//               className="bg-custom-blue text-white px-4 py-2 rounded-md"
//             >
//               Generate Report
//             </button>
//             {generatedReport && generatedReport.reportType === 'customerFeedback' && (
//               <>
//                 <button
//                   onClick={() => exportToExcel('customerFeedback', generatedReport.data)}
//                   className="bg-custom-blue text-white px-4 py-2 rounded-md"
//                 >
//                   Export to Excel
//                 </button>
//                 <button
//                   onClick={() => exportToPDF('customerFeedback', generatedReport.data)}
//                   className="bg-red-500 text-white px-4 py-2 rounded-md"
//                 >
//                   Export to PDF
//                 </button>
//               </>
//             )}
//           </div>

//           {generatedReport && generatedReport.reportType === 'customerFeedback' && renderTable(generatedReport.data)}
//         </>
//       )}
//     </div>
//   );
// }

// export default ReportGenerator;



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import { FaChartLine, FaMoneyBillWave, FaUndo, FaComments, FaFileAlt, FaClipboardList } from 'react-icons/fa'
import { Combobox } from '@headlessui/react'; // Import Combobox from Headless UI
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/outline'; // Adjust the path ba
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import axios from 'axios';
import { FaCalendarAlt } from 'react-icons/fa';
import { GETALLSTORES_API } from '../../Constants/apiRoutes'
function ReportGenerator() {
  const [activeTab, setActiveTab] = useState('salesReport');
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderIds, setOrderIds] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(''); // For storing the selected order number
  // 1. Define the state for storing order status list and selected status
  const [orderStatusList, setOrderStatusList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);


  // 2. Define the state for handling input query and filtered status list
  const [query, setQuery] = useState('');
  const [filteredStatusList, setFilteredStatusList] = useState([]);

  // 3. Define errors state for validation
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [storeNames, setStoreNames] = useState([]);

  const [salesReport, setSalesReport] = useState({
    dateRange: { startDate: '', endDate: '' },
    productCategory: '',
    store: '', // Added store field
  });

  const [paymentReport, setPaymentReport] = useState({
    dateRange: { startDate: '', endDate: '' },
    productCategory: '',
    store: '',
  });

  const [returnReport, setReturnReport] = useState({
    dateRange: { startDate: '', endDate: '' },
    productCategory: '',
    store: '',
  });

  const [customerFeedback, setCustomerFeedback] = useState({
    dateRange: { startDate: '', endDate: '' },
    productCategory: '',
    store: '',
  });

  const [generatedReport, setGeneratedReport] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedStore2, setSelectedStore2] = useState(null);
  const [selectedStore3, setSelectedStore3] = useState(null);
  const [selectedStore4, setSelectedStore4] = useState(null);

  const handleInputChange = (reportType, field, value) => {
    if (reportType === 'salesReport') {
      setSalesReport({ ...salesReport, [field]: value });
    } else if (reportType === 'paymentReport') {
      setPaymentReport({ ...paymentReport, [field]: value });
    } else if (reportType === 'returnReport') {
      setReturnReport({ ...returnReport, [field]: value });
    } else if (reportType === 'customerFeedback') {
      setCustomerFeedback({ ...customerFeedback, [field]: value });
    }
  };

  const handleSubmit = (reportType) => {
    if (reportType === 'salesReport') {
      setGeneratedReport({ reportType: 'salesReport', data: salesReport });
    } else if (reportType === 'paymentReport') {
      setGeneratedReport({ reportType: 'paymentReport', data: paymentReport });
    } else if (reportType === 'returnReport') {
      setGeneratedReport({ reportType: 'returnReport', data: returnReport });
    } else if (reportType === 'customerFeedback') {
      setGeneratedReport({ reportType: 'customerFeedback', data: customerFeedback });
    }
  };

  const exportToExcel = (reportType, data) => {
    const dataArray = Array.isArray(data) ? data : [data];
    const ws = XLSX.utils.json_to_sheet(dataArray);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `${reportType} Report`);
    XLSX.writeFile(wb, `${reportType}_report.xlsx`);
  };

  const exportToPDF = (reportType, data) => {
    const dataArray = Array.isArray(data) ? data : [data];
    const doc = new jsPDF();
    doc.setFontSize(12);

    doc.text(`${reportType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} Report`, 10, 10);

    let yOffset = 20;
    dataArray.forEach((report, index) => {
      if (yOffset > 270) { // Check if page is full
        doc.addPage();
        yOffset = 10;
      }
      doc.text(`${index + 1}. ${JSON.stringify(report)}`, 10, yOffset);
      yOffset += 10;
    });

    doc.save(`${reportType}_report.pdf`);
  };
  const [startDate, setStartDate] = useState(null);// State for the start date
  const [startDate1, setStartDate1] = useState(null);
  const [startDate2, setStartDate2] = useState(null);
  const [startDate3, setStartDate3] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [endDate1, setEndDate1] = useState(null);
  const [endDate2, setEndDate2] = useState(null);
  const [endDate3, setEndDate3] = useState(null);// State for the end date
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([]);// State for the search term
  const [filteredOrders, setFilteredOrders] = useState(orders); // State for filtered orders


  // Helper function to format dates to 'YYYY-MM-DD'
  const formatDateForInput = (date) => {
    if (!date) return ''; // Return empty string if no date
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2); // Ensure 2 digits for month
    const day = ('0' + d.getDate()).slice(-2); // Ensure 2 digits for day
    return `${d.getFullYear()}-${month}-${day}`; // Format as 'YYYY-MM-DD'
  };

  const handleDateRangeChange = (range) => {
    if (range && range.length === 2) {
      // When a valid range is selected
      setStartDate(range[0]); // Set the start date
      setEndDate(range[1]);   // Set the end date
    } else {
      // If no range is selected, reset both dates
      setStartDate(null);
      setEndDate(null);
    }
  };
  const handleDateRangeChange1 = (range) => {
    if (range && range.length === 2) {
      // When a valid range is selected
      setStartDate1(range[0]); // Set the start date
      setEndDate1(range[1]);   // Set the end date
    } else {
      // If no range is selected, reset both dates
      setStartDate1(null);
      setEndDate1(null);
    }
  };
  const handleDateRangeChange2 = (range) => {
    if (range && range.length === 2) {
      // When a valid range is selected
      setStartDate2(range[0]); // Set the start date
      setEndDate2(range[1]);   // Set the end date
    } else {
      // If no range is selected, reset both dates
      setStartDate2(null);
      setEndDate2(null);
    }
  };
  const handleDateRangeChange3 = (range) => {
    if (range && range.length === 2) {
      // When a valid range is selected
      setStartDate3(range[0]); // Set the start date
      setEndDate3(range[1]);   // Set the end date
    } else {
      // If no range is selected, reset both dates
      setStartDate3(null);
      setEndDate3(null);
    }
  };
  const [selectedReferralType, setSelectedReferralType] = useState("");
  const [selectedReferenceSubOption, setSelectedReferenceSubOption] = useState("");
  const [selectedSocialMediaPlatform, setSelectedSocialMediaPlatform] = useState("");
  const [orderDetails, setOrderDetails] = useState({
    ReferedBy: "",
    refereeName: "",
  });
  const [error, setError] = useState("");

  // Handle referral type selection
  const handleReferralTypeChange = (value) => {
    setSelectedReferralType(value);
    setOrderDetails({ ...orderDetails, ReferedBy: value });
    // Reset sub-options if switching referral types
    setSelectedReferenceSubOption("");
    setSelectedSocialMediaPlatform("");
  };

  // Handle sub-option changes for Reference
  const handleReferenceSubOptionChange = (value) => {
    setSelectedReferenceSubOption(value);
  };

  // Handle sub-option changes for Social Media Platform
  const handleSocialMediaPlatformChange = (value) => {
    setSelectedSocialMediaPlatform(value);
  };

  // Handle referee name input change
  const handleRefereeNameChange = (e) => {
    setOrderDetails({ ...orderDetails, refereeName: e.target.value });
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [fileData, setFileData] = useState(null); // Store uploaded file data
  const [manualFileID, setManualFileID] = useState('');
  const [fileID, setFileID] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setMessage(''); // Reset message on file selection
    }
  };

  const handleFileUpload = () => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    const uploadUrl = 'https://imly-b2y.onrender.com/api/InventoryFile/uploadInventoryFile';

    const formData = new FormData();
    formData.append('inventoryFile', selectedFile); 
    // Change 'inventoryFile' to the correct field name

    setUploading(true); // Set uploading state to true

    fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Upload failed');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);
        setFileData(data);
        setMessage('File uploaded successfully!');
      })
      .catch((error) => {
        console.error('Error:', error);
        setMessage('File upload failed.');
      })
      .finally(() => {
        setUploading(false); // Reset uploading state
        setSelectedFile(null); // Reset selected file after upload
      });
  };
  // const handleFileDownload = () => {
  //   if (fileData) {
  //     const { downloadUrl } = fileData; // Use download URL from uploaded file data
  //     console.log('File Data:', fileData); // Log the entire file data
  //     console.log('Downloading from URL:', downloadUrl); // Debug log
      
  //     // Check if the downloadUrl is valid
  //     if (downloadUrl) {
  //       window.open(downloadUrl, '_blank'); // Open download URL in a new tab
  //     } else {
  //       alert('Download URL is not available. Please check the uploaded file data.'); // Updated: More descriptive error
  //     }
  //   } else {
  //     alert('No file uploaded. Please upload a file first.');
  //   }
  // };


  const handleManualFileDownload = () => {
    if (!manualFileID) {
      alert('Please enter a valid File ID.');
      return;
    }

    // Call the API to get file data by ID (this assumes you have an endpoint for this)
    const downloadUrl = `https://imly-b2y.onrender.com/api/InventoryFile/getInventoryFileById/${manualFileID}`;

    fetch(downloadUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch file data');
        }
        return response.json();
      })
      .then((data) => {
        const { downloadUrl } = data; // Get download URL from the response
        window.open(downloadUrl, '_blank'); // Open download URL in a new tab
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to download the file. Please check the File ID.');
      });
  };
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get(GETALLSTORES_API);
        console.log("API Response:", response.data);

        // Extract the Stores array from the API response
        const storesData = response.data.Stores || [];

        // Check if it's an array and set store names
        setStoreNames(Array.isArray(storesData) ? storesData : []);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchStores();
  }, []);
  //fe
  useEffect(() => {
    const fetchOrderStatuses = async () => {
      try {
        const response = await fetch(
          "https://imly-b2y.onrender.com/api/Orderstatus/getAllOrderStatus"
        );
        const data = await response.json();

        // Log the data to see its structure
        console.log("Fetched Order Statuses:", data);

        // Check if data is in the expected format
        if (Array.isArray(data.data)) {
          setOrderStatusList(data.data);
        } else {
          console.error("Data is not in the expected format:", data);
        }
      } catch (error) {
        console.error("Error fetching order statuses:", error);
      }
    };

    fetchOrderStatuses();
  }, []);

  useEffect(() => {
    const filtered = orderStatusList.filter((status) =>
      status.OrderStatus.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredStatusList(filtered);
  }, [query, orderStatusList]);

  const handleSelect = (statusID) => {
    setSelectedStatus(statusID);
  };
  // Fix: Define orders and setOrders


  // Fetch all orders
  useEffect(() => {
    const fetchOrderNumbers = async () => {
      try {
        const response = await fetch('https://imly-b2y.onrender.com/api/orders/getAllOrders');
        const data = await response.json();

        if (data.StatusCode === "SUCCESS" && Array.isArray(data.data)) {
          setOrders(data.data.map(order => order.OrderNumber)); // Set orders
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error('Error fetching order numbers:', error);
      }
    };

    fetchOrderNumbers();
  }, []);

  // Filter orders based on the search term
  useEffect(() => {
    const fetchOrderNumbers = async () => {
      try {
        const response = await fetch('https://imly-b2y.onrender.com/api/orders/getAllOrders');
        const data = await response.json();

        if (data.StatusCode === "SUCCESS" && Array.isArray(data.data)) {
          setOrders(data.data.map(order => order.OrderNumber)); // Set orders
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error('Error fetching order numbers:', error);
      }
    };

    fetchOrderNumbers();
  }, []);

  // Filter orders based on the search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = orders.filter((orderNumber) =>
        orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOrders(filtered);

      // Automatically select the order if there is only one match
      if (filtered.length === 1) {
        setSearchTerm(filtered[0]);
        setFilteredOrders([]); // Clear dropdown once a match is found
      }
    } else {
      setFilteredOrders(orders); // Show all orders when search term is empty
    }
  }, [searchTerm, orders]);

  const handleInputChange1 = (e) => {
    setSearchTerm(e.target.value); // Update search term
  };
  const handleInputChange2 = (selectedOrder) => {
    setSearchTerm(selectedOrder); // Set the selected order in the input
    setFilteredOrders([]); // Clear dropdown after selection
  };
  // Define handleInputChange2 function
  const [data, setData] = useState([]); // To store API response data
  const postData = async () => {
    const startDate = startDate1 ? formatDateForInput(new Date(startDate1)) : null;
    const endDate = endDate1 ? formatDateForInput(new Date(endDate1)) : null;
    const storeID = selectedStore2 ? selectedStore2.StoreID : null; // Use selectedStore3 for the store ID
    const orderId = searchTerm || null;

    const url = `https://imly-b2y.onrender.com/api/reports//getPaymentReport?startDate=${startDate}&endDate=${endDate}&storeId=${storeID}&orderId=${orderId}`;

    try {
      // Make the API call
      const response = await axios.get(url, { responseType: 'blob' }); // Important for file downloads

      // Create a blob URL for the response data
      const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = blobUrl;

      // Set the default file name for the downloaded file
      const contentDisposition = response.headers['content-disposition'];
      const fileName = contentDisposition
        ? contentDisposition.split('filename=')[1].replace(/"/g, '') // Extract filename from headers if present
        : 'customer_report.csv'; // Fallback filename

      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl); // Clean up the URL object
    } catch (error) {
      // Improved error handling
      console.error('Error during Axios request:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }
  };
  const postData1 = async () => {
    const startDate = startDate2 ? formatDateForInput(new Date(startDate2)) : null;
    const endDate = endDate2 ? formatDateForInput(new Date(endDate2)) : null;
    const storeID = selectedStore3 ? selectedStore3.StoreID : null;

    const url = `https://imly-b2y.onrender.com/api/reports/getCustomerReport?CreatedAt=${startDate}&endDate=${endDate}&storeId=${storeID}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob(); // Get the response as a Blob
      const urlBlob = window.URL.createObjectURL(blob); // Create a URL for the Blob

      const a = document.createElement('a'); // Create a link element
      a.href = urlBlob; // Set the link's href to the Blob URL
      a.download = 'customer_report.csv'; // Set the desired file name
      document.body.appendChild(a); // Append the link to the body
      a.click(); // Programmatically click the link to trigger the download
      a.remove(); // Remove the link from the document
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  // Call postData when needed, e.g., on form submission or button click.

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-4 ml-10 lg:ml-80 w-auto p-6 mt-10 mx-10 mb-10">
      <h2 className="text-2xl font-bold mb-4">Report Generator</h2>
      <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul class="flex flex-wrap -mb-px">
          <li className="me-2">
            <button
              onClick={() => setActiveTab('salesReport')}
              className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'salesReport'
                ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500' // Active styles
                : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300' // Inactive styles
                }`}
            >
              <FaChartLine
                className="inline-block mr-2"
                color={activeTab === 'salesReport' ? '#2563EB' : '#6B7280'} // Active: Blue, Inactive: Gray
              />
              Sales Report
            </button>
          </li>
          <li class="me-2">
            <button onClick={() => setActiveTab('paymentReport')}
              className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'paymentReport'
                ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500' // Active styles
                : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300' // Inactive styles
                }`}><FaMoneyBillWave
                className="inline-block mr-2"
                color={activeTab === 'paymentReport' ? '#2563B5' : '#FFC107'} // Active: Blue, Inactive: Gray
              />
              Payment Report</button>
          </li>
          <li class="me-2">
            <button onClick={() => setActiveTab('returnReport')}
              className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'returnReport'
                ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500' // Active styles
                : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300' // Inactive styles
                }`}><FaFileAlt
                className="inline-block mr-2"
                color={activeTab === 'returnReport' ? '#2563EB' : '#28A745'} // Active: Blue, Inactive: Gray
              />
              Customer Report</button>
          </li>
          <li class="me-2">
            <button onClick={() => setActiveTab('customerFeedback')}
              className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'customerFeedback'
                ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500' // Active styles
                : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300' // Inactive styles
                }`}> <FaClipboardList
                className="inline-block mr-2"
                color={activeTab === 'customerFeedback' ? '#2563EB' : '#DC3545'} // Active: Blue, Inactive: Gray
              />
              Inventory Report</button>
          </li>
        </ul>
      </div>
      {activeTab === 'salesReport' && (
        <>
          <div className="mb-8 ml-10 mt-10 md:ml-20 lg:ml-40">
            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10">
                  <label className="text-xs font-medium text-gray-700 w-full md:w-40">Date Range</label>
                  <DateRangePicker
                    placeholder="Select Date Range"
                    onChange={handleDateRangeChange}
                    border='none'
                    className="p-1 w-full md:w-64 border-none focus:outline-none rounded-md"
                  />
                </div>

                {/* Start Date */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10">
                  <label className="text-xs font-medium text-gray-700 w-full md:w-40">Start Date</label>
                  <input
                    type="date"
                    value={startDate ? formatDateForInput(startDate) : ''}
                    onChange={(e) => setStartDate(new Date(e.target.value))}
                    className="p-1 w-full md:w-64 border rounded-md" // Set consistent width
                  />
                </div>

                {/* End Date */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10">
                  <label className="text-xs font-medium text-gray-700 w-full md:w-40">End Date</label>
                  <input
                    type="date"
                    value={endDate ? formatDateForInput(endDate) : ''}
                    onChange={(e) => setEndDate(new Date(e.target.value))}
                    className="p-1 w-full md:w-64 border rounded-md" // Set consistent width
                  />
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10">
                  <label className="text-xs font-medium text-gray-700 w-full md:w-40">Store</label>
                  <Combobox value={selectedStore} onChange={setSelectedStore}>
                    <div className="relative w-full md:w-64">
                      <Combobox.Input
                        className="p-1 w-full border rounded-md border-gray-300"
                        displayValue={(store) => store?.StoreName || "Select Store Name"}
                        placeholder="Select Store Name"
                      />
                      <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </Combobox.Button>
                      <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
                        {/* Add "Select Store ID" option */}
                        <Combobox.Option
                          key="select-store-id"
                          className={({ active }) =>
                            `cursor-pointer select-none relative p-2 ${active ? "bg-blue-500 text-white" : "text-gray-900"
                            }`
                          }
                          value={{ StoreID: null, StoreName: "Select Store ID" }}
                        >
                          {({ selected }) => (
                            <>
                              <span className={selected ? "font-semibold" : "font-normal"}>
                                Select Store ID
                              </span>
                              {selected && (
                                <CheckIcon className="h-5 w-5 text-white absolute right-2" aria-hidden="true" />
                              )}
                            </>
                          )}
                        </Combobox.Option>

                        {/* Render all store options */}
                        {storeNames.map((store) => (
                          <Combobox.Option
                            key={store.StoreID}
                            className={({ active }) =>
                              `cursor-pointer select-none relative p-2 ${active ? "bg-blue-500 text-white" : "text-gray-900"
                              }`
                            }
                            value={store}
                          >
                            {({ selected }) => (
                              <>
                                <span className={selected ? "font-semibold" : "font-normal"}>
                                  {store.StoreName}
                                </span>
                                {selected && (
                                  <CheckIcon className="h-5 w-5 text-white absolute right-2" aria-hidden="true" />
                                )}
                              </>
                            )}
                          </Combobox.Option>
                        ))}
                      </Combobox.Options>
                    </div>
                  </Combobox>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10">
                  <label className="text-xs font-medium text-gray-700 w-full md:w-40">Status</label>
                  <Combobox value={selectedStatus} onChange={handleSelect}>
                    <div className="relative w-full md:w-64"> {/* Consistent width */}
                      <Combobox.Input
                        className={`p-1 w-full border rounded-md ${errors.OrderStatus ? "border-red-500" : "border-gray-300"}`}
                        onChange={(e) => setQuery(e.target.value)}
                        displayValue={(statusID) =>
                          orderStatusList.find((status) => status.StatusID === statusID)?.OrderStatus || ""
                        }
                      />
                      <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </Combobox.Button>
                      <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
                        {filteredStatusList.length > 0 ? (
                          filteredStatusList.map((status) => (
                            <Combobox.Option
                              key={status.StatusID}
                              value={status.StatusID}
                              className={({ active }) =>
                                `cursor-pointer select-none relative p-2 ${active ? "bg-blue-500 text-white" : "text-gray-900"}`
                              }
                            >
                              {status.OrderStatus}
                            </Combobox.Option>
                          ))
                        ) : (
                          <div className="p-2 text-gray-500">No status found</div>
                        )}
                      </Combobox.Options>
                    </div>
                  </Combobox>
                </div>

              </div>
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleSubmit('salesReport')}
              className="bg-custom-blue mt-5 mr-2 text-white px-4 py-2 rounded-md"
            >
              Download Report
            </button>
          </div>
        </>
      )}

      {activeTab === 'paymentReport' && (
        <>
          <div className="mb-8 ml-10 mt-10 md:ml-20 lg:ml-40">
            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10">
                  <label className="text-xs font-medium text-gray-700 w-full md:w-40">Date Range</label>
                  <DateRangePicker
                    placeholder="Select Date Range"
                    onChange={handleDateRangeChange1}
                    border='none'
                    className="p-1 w-full md:w-64 border-none rounded-md"
                  />
                </div>

                {/* Start Date */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10">
                  <label className="text-xs font-medium text-gray-700 w-full md:w-40">Start Date</label>
                  <input
                    type="date"
                    value={startDate1 ? formatDateForInput(startDate1) : ''}
                    onChange={(e) => setStartDate1(new Date(e.target.value))}
                    className="p-1 w-full md:w-64 border rounded-md" // Set consistent width
                  />
                </div>

                {/* End Date */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10">
                  <label className="text-xs font-medium text-gray-700 w-full md:w-40">End Date</label>
                  <input
                    type="date"
                    value={endDate1 ? formatDateForInput(endDate1) : ''}
                    onChange={(e) => setEndDate1(new Date(e.target.value))}
                    className="p-1 w-full md:w-64 border rounded-md" // Set consistent width
                  />
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10">
                  <label className="text-xs font-medium text-gray-700 w-full md:w-40">Store</label>
                  <Combobox value={selectedStore2} onChange={setSelectedStore2}>
                    <div className="relative w-full md:w-64">
                      <Combobox.Input
                        className="p-1 w-full border rounded-md border-gray-300"
                        displayValue={(store) => store?.StoreName || "Select Store Name"}
                        placeholder="Select Store Name"
                      />
                      <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </Combobox.Button>
                      <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
                        {/* Add "Select Store ID" option */}
                        <Combobox.Option
                          key="select-store-id"
                          className={({ active }) =>
                            `cursor-pointer select-none relative p-2 ${active ? "bg-blue-500 text-white" : "text-gray-900"
                            }`
                          }
                          value={{ StoreID: null, StoreName: "Select Store ID" }}
                        >
                          {({ selected }) => (
                            <>
                              <span className={selected ? "font-semibold" : "font-normal"}>
                                Select Store ID
                              </span>
                              {selected && (
                                <CheckIcon className="h-5 w-5 text-white absolute right-2" aria-hidden="true" />
                              )}
                            </>
                          )}
                        </Combobox.Option>

                        {/* Render all store options */}
                        {storeNames.map((store) => (
                          <Combobox.Option
                            key={store.StoreID}
                            className={({ active }) =>
                              `cursor-pointer select-none relative p-2 ${active ? "bg-blue-500 text-white" : "text-gray-900"
                              }`
                            }
                            value={store}
                          >
                            {({ selected }) => (
                              <>
                                <span className={selected ? "font-semibold" : "font-normal"}>
                                  {store.StoreName}
                                </span>
                                {selected && (
                                  <CheckIcon className="h-5 w-5 text-white absolute right-2" aria-hidden="true" />
                                )}
                              </>
                            )}
                          </Combobox.Option>
                        ))}
                      </Combobox.Options>
                    </div>
                  </Combobox>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10">
                  <label className="text-xs font-medium text-gray-700 w-full md:w-40">
                    Order Number
                  </label>
                  <div className="relative w-full md:w-64">
                    {/* Search input */}
                    <input
                      type="text"
                      placeholder="Search Order Number"
                      className="p-1 w-full border rounded-md border-gray-300"
                      value={searchTerm}
                      onChange={handleInputChange1}
                    />

                    {/* Display filtered order numbers only if there are multiple matches */}
                    {searchTerm && filteredOrders.length > 0 && (
                      <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
                        {filteredOrders.map((orderNumber) => (
                          <li
                            key={orderNumber}
                            onClick={() => handleInputChange2(orderNumber)}
                            className="cursor-pointer select-none relative p-2 hover:bg-blue-500 hover:text-white"
                          >
                            {orderNumber}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={postData}
              className="bg-custom-blue mt-5 mr-2 text-white px-4 py-2 rounded-md"
            >
              Download Report
            </button>
          </div>

        </>
      )}

      {activeTab === 'returnReport' && (
        <>
          <div className="mb-8 ml-10 mt-10 md:ml-20 lg:ml-40">
            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10">
                  <label className="text-xs font-medium text-gray-700 w-full md:w-40">Date Range</label>
                  <DateRangePicker
                    placeholder="Select Date Range"
                    onChange={handleDateRangeChange2}
                    border='none'
                    className="p-1 w-full md:w-64 border-none rounded-md"
                  />
                </div>

                {/* Start Date */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10">
                  <label className="text-xs font-medium text-gray-700 w-full md:w-40">Start Date</label>
                  <input
                    type="date"
                    value={startDate2 ? formatDateForInput(startDate2) : ''}
                    onChange={(e) => setStartDate2(new Date(e.target.value))}
                    className="p-1 w-full md:w-64 border rounded-md" // Set consistent width
                  />
                </div>

                {/* End Date */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10">
                  <label className="text-xs font-medium text-gray-700 w-full md:w-40">End Date</label>
                  <input
                    type="date"
                    value={endDate2 ? formatDateForInput(endDate2) : ''}
                    onChange={(e) => setEndDate2(new Date(e.target.value))}
                    className="p-1 w-full md:w-64 border rounded-md" // Set consistent width
                  />
                </div>
                {/* Store */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10">
                  <label className="text-xs font-medium text-gray-700 w-full md:w-40">Store</label>
                  <Combobox value={selectedStore3} onChange={setSelectedStore3}>
                    <div className="relative w-full md:w-64">
                      <Combobox.Input
                        className="p-1 w-full border rounded-md border-gray-300"
                        displayValue={(store) => store?.StoreName || "Select Store Name"}
                        placeholder="Select Store Name"
                      />
                      <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </Combobox.Button>
                      <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
                        {/* Add "Select Store ID" option */}
                        <Combobox.Option
                          key="select-store-id"
                          className={({ active }) =>
                            `cursor-pointer select-none relative p-2 ${active ? "bg-blue-500 text-white" : "text-gray-900"
                            }`
                          }
                          value={{ StoreID: null, StoreName: "Select Store ID" }}
                        >
                          {({ selected }) => (
                            <>
                              <span className={selected ? "font-semibold" : "font-normal"}>
                                Select Store ID
                              </span>
                              {selected && (
                                <CheckIcon className="h-5 w-5 text-white absolute right-2" aria-hidden="true" />
                              )}
                            </>
                          )}
                        </Combobox.Option>

                        {/* Render all store options */}
                        {storeNames.map((store) => (
                          <Combobox.Option
                            key={store.StoreID}
                            className={({ active }) =>
                              `cursor-pointer select-none relative p-2 ${active ? "bg-blue-500 text-white" : "text-gray-900"
                              }`
                            }
                            value={store}
                          >
                            {({ selected }) => (
                              <>
                                <span className={selected ? "font-semibold" : "font-normal"}>
                                  {store.StoreName}
                                </span>
                                {selected && (
                                  <CheckIcon className="h-5 w-5 text-white absolute right-2" aria-hidden="true" />
                                )}
                              </>
                            )}
                          </Combobox.Option>
                        ))}
                      </Combobox.Options>
                    </div>
                  </Combobox>
                </div>
                {/* Product Category */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10">
                  <label className="text-xs font-medium text-gray-700 w-full md:w-40">Referred By</label>
                  <Combobox value={paymentReport.productCategory} onChange={(value) => handleInputChange('paymentReport', 'productCategory', value)}>
                    <div className="relative w-full md:w-64"> {/* Set consistent width */}
                      <Combobox.Input
                        className="p-1 w-full border rounded-md border-gray-300"
                        displayValue={(category) => category || ""}
                      />
                      <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </Combobox.Button>

                      <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
                        {['Social Media', 'Walk-In', 'Reference'].map((option, index) => (
                          <Combobox.Option
                            key={index}
                            value={option}
                            className={({ active }) =>
                              `cursor-pointer select-none relative p-2 ${active ? 'bg-blue-500 text-white' : 'text-gray-900'}`
                            }
                          >
                            {option}
                          </Combobox.Option>
                        ))}
                      </Combobox.Options>
                    </div>
                  </Combobox>
                </div>

                {selectedReferralType === 'Reference' && (
                  <div className="mt-4">
                    <label className="text-xs font-medium text-gray-700">Reference Sub-option</label>
                    <Combobox value={selectedReferenceSubOption} onChange={handleReferenceSubOptionChange}>
                      <div className="relative w-full md:w-64"> {/* Set consistent width */}
                        <Combobox.Input
                          className="p-1 w-full border rounded-md border-gray-300"
                          displayValue={(option) => option || ""}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </Combobox.Button>

                        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
                          {['Director', 'Employee', 'Existing'].map((option, index) => (
                            <Combobox.Option
                              key={index}
                              value={option}
                              className={({ active }) =>
                                `cursor-pointer select-none relative p-2 ${active ? 'bg-blue-500 text-white' : 'text-gray-900'}`
                              }
                            >
                              {option}
                            </Combobox.Option>
                          ))}
                        </Combobox.Options>
                      </div>
                    </Combobox>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={postData1}
              className="bg-custom-blue mt-5 mr-2 text-white px-4 py-2 rounded-md"
            >
              Download Report
            </button>
          </div>


        </>
      )}

      {activeTab === 'customerFeedback' && (
        <>
          <div className="mb-8 ml-10 mt-10 md:ml-20 lg:ml-40">
            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">

                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10">
                  <label className="text-xs font-medium text-gray-700 w-full md:w-40">Upload</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="p-1 w-full md:w-64 border rounded-md"
                  />
                  {selectedFile && (
                    <div className="text-xs text-gray-600 mt-1">
                      Selected file: {selectedFile.name}
                    </div>
                  )}
                  <button
                    onClick={handleFileUpload}
                    disabled={uploading}
                    className={`mt-2 p-2 rounded-md ${uploading ? 'bg-gray-500' : 'bg-blue-500 text-white'}`}
                  >
                    {uploading ? 'Uploading...' : 'Upload'}
                  </button>
                  {message && (
                    <div className="mt-2 text-xs text-gray-700">
                      {message}
                    </div>
                  )}
                </div>
                {/* Show download button if file has been uploaded */}

                {/* Manual file ID input */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10">
                  <label className="text-xs font-medium text-gray-700 w-full md:w-40">Enter File ID for Download</label>
                  <input
                    type="text"
                    value={manualFileID}
                    onChange={(e) => setManualFileID(e.target.value)}
                    className="p-1 w-full md:w-64 border rounded-md"
                    placeholder="Enter File ID"
                  />
                  <button
                    onClick={handleManualFileDownload}
                    className="mt-2 p-2 bg-blue-500 text-white rounded-md"
                  >
                    Download
                  </button>
                </div>


              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ReportGenerator;
