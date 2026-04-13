import { FaRegEnvelope } from "react-icons/fa";

function ApplicationEmailPreview({ document }) {
  const data = JSON.parse(document.content);

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
      
      {/* Top Bar (like email header) */}
      <div className="bg-gray-100 px-6 py-4 flex items-center gap-3 border-b">
        <FaRegEnvelope className="text-gray-500" />
        <h1 className="text-lg font-semibold text-gray-800">
          {data.subject}
        </h1>
      </div>

      <div className="p-6">
        
        {/* Email meta */}
        <div className="mb-6 text-sm text-gray-600">
          <p>
            <span className="font-medium text-gray-800">From:</span>{" "}
            Zakaria
          </p>
          <p>
            <span className="font-medium text-gray-800">To:</span>{" "}
            Hiring Manager
          </p>
        </div>

        {/* Email body */}
        <div className="space-y-4 text-gray-700 leading-relaxed">
          {data.greeting && <p>{data.greeting},</p>}
          {data.body && <p>{data.body}</p>}
          {data.closing && <p>{data.closing}</p>}
        </div>

        {/* Signature */}
        {data.signature && (
          <div className="mt-8 border-t pt-4 text-gray-700 whitespace-pre-line">
            {data.signature}
          </div>
        )}
      </div>
    </div>
  );
}

export default ApplicationEmailPreview;