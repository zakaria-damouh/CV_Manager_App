import { FaEnvelope, FaPhone, FaGithub, FaLinkedin, FaMapMarkerAlt } from "react-icons/fa";

function CVPreview({ document }) {
  const data = JSON.parse(document.content);

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6">
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <p className="text-blue-100">{data.title}</p>

        {/* Contact */}
        <div className="flex flex-wrap gap-4 mt-4 text-sm">
          {data.contact?.phone && (
            <span className="flex items-center gap-2">
              <FaPhone /> {data.contact.phone}
            </span>
          )}
          {data.contact?.email && (
            <span className="flex items-center gap-2">
              <FaEnvelope /> {data.contact.email}
            </span>
          )}
          {data.contact?.github && (
            <span className="flex items-center gap-2">
              <FaGithub /> {data.contact.github}
            </span>
          )}
          {data.contact?.linkedin && (
            <span className="flex items-center gap-2">
              <FaLinkedin /> {data.contact.linkedin}
            </span>
          )}
          {data.contact?.location && (
            <span className="flex items-center gap-2">
              <FaMapMarkerAlt /> {data.contact.location}
            </span>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">

        {/* Summary */}
        {data.summary && (
          <section>
            <h2 className="text-lg font-semibold mb-2 text-gray-800">Profile</h2>
            <p className="text-gray-600">{data.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experiences?.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Experience</h2>
            <div className="space-y-4">
              {data.experiences.map((exp, i) => (
                <div key={i} className="border-l-2 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-800">
                    {exp.role} — <span className="text-blue-600">{exp.company}</span>
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(exp.startDate).toLocaleDateString()} -{" "}
                    {new Date(exp.endDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.formations?.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Education</h2>
            <div className="space-y-4">
              {data.formations.map((edu, i) => (
                <div key={i}>
                  <h3 className="font-semibold text-gray-800">
                    {edu.degree} — {edu.specialty}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {edu.institution} •{" "}
                    {new Date(edu.startDate).getFullYear()} -{" "}
                    {new Date(edu.endDate).getFullYear()}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.competences?.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.competences.map((skill, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {data.languages?.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Languages</h2>
            <div className="space-y-1">
              {data.languages.map((lang, i) => (
                <p key={i} className="text-gray-600">
                  {lang.name} — <span className="text-gray-500">{lang.level}</span>
                </p>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default CVPreview;