function CoverLetterPreview({ document }) {
  const data = JSON.parse(document.content);

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      
      {/* Header */}
      <div className="mb-6 border-b pb-4">
        <h1 className="text-xl font-semibold text-gray-800">
          {data.subject}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {data.company}
        </p>
      </div>

      {/* Recipient */}
      <div className="mb-6 text-gray-700">
        <p>{data.recipient}</p>
      </div>

      {/* Letter Content */}
      <div className="space-y-4 text-gray-700 leading-relaxed">
        {/* Opening */}
        {data.opening && <p>{data.opening}</p>}

        {/* Body */}
        {data.body && <p>{data.body}</p>}

        {/* Closing */}
        {data.closing && <p>{data.closing}</p>}
      </div>

      {/* Signature */}
      <div className="mt-8">
        <p className="text-gray-700">Best regards,</p>
        <p className="font-semibold text-gray-800 mt-1">Zakaria</p>
      </div>
    </div>
  );
}

export default CoverLetterPreview;