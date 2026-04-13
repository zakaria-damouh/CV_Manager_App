import { FaUserTie, FaBolt } from "react-icons/fa";

function ProfileSummaryPreview({ document }) {
  const data = JSON.parse(document.content);

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-6 flex items-center gap-3">
        <div className="p-3 bg-white/20 rounded-lg">
          <FaUserTie />
        </div>
        <h1 className="text-xl font-semibold">{data.headline}</h1>
      </div>

      <div className="p-6 space-y-6">
        
        {/* Summary */}
        {data.summary && (
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              About Me
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {data.summary}
            </p>
          </section>
        )}

        {/* Key Strengths */}
        {data.keyStrengths?.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FaBolt className="text-yellow-500" />
              Key Strengths
            </h2>

            <div className="flex flex-wrap gap-2">
              {data.keyStrengths.map((skill, i) => (
                <span
                  key={i}
                  className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default ProfileSummaryPreview;