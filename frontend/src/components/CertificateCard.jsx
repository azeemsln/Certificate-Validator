import {
  ArrowRight,
  Clock,
  Briefcase,
  Check,
  IdCard,
  Mail,
} from "lucide-react";
import calculateDurationInMonths from "../utils/calculateDurationInMonth";

const CertificateCard = ({ certificateData }) => {
  const data = certificateData.data;
  const durationText = calculateDurationInMonths(
    data?.startDate,
    data?.endDate
  );

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{data?.name}</h2>
            <p className="text-blue-100 text-sm mt-1">{data?.Domain}</p>
          </div>

          <div className="bg-white/20 backdrop-blur-md rounded-lg px-4 py-2 shadow-sm">
            <p className="text-xs text-blue-100">Certificate #</p>
            <p className="text-lg font-mono font-semibold">
              {data?.certificateNumber}
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">

        {/* Contact + Employment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3 tracking-wide">
              Contact Information
            </h3>

            <div className="rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm border border-indigo-200">
                  <Mail className="text-indigo-600" size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Email Address</p>
                  <p className="text-sm font-semibold text-gray-900 break-words">
                    {data?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Employment Details */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
              Employment Details
            </h3>

            <div className="flex items-start space-x-3 mb-4">
              <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center">
                <IdCard className="text-green-600" size={17} />
              </div>
              <div>
                <p className="text-xs text-gray-500">Employee ID</p>
                <p className="text-sm font-medium text-gray-900">
                  {data?.employeeID}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center">
                <Briefcase className="text-green-600" size={17} />
              </div>
              <div>
                <p className="text-xs text-gray-500">Domain</p>
                <p className="text-sm font-medium text-gray-900">
                  {data?.Domain}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Duration Section */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4 flex items-center">
            <Clock className="w-4 h-4 mr-2 text-indigo-500" />
            Duration
          </h3>

          {/* Duration Box */}
          <div className="flex items-center justify-center bg-indigo-50 border border-indigo-200 rounded-xl p-6 shadow-sm">
            <p className="text-xl font-extrabold text-indigo-700">
              {durationText}
            </p>
          </div>

          {/* Dates */}
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4 mt-5 border border-gray-100">
            <div className="text-center flex-1">
              <p className="text-xs text-gray-500 mb-1">Start Date</p>
              <p className="text-base font-semibold text-gray-900">
                {data?.startDate?.split("T")[0].split("-").reverse().join("-")}
              </p>
            </div>

            <ArrowRight className="text-gray-400 mx-4" size={22} />

            <div className="text-center flex-1">
              <p className="text-xs text-gray-500 mb-1">End Date</p>
              <p className="text-base font-semibold text-gray-900">
                {data?.endDate?.split("T")[0].split("-").reverse().join("-")}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
          <Check size={14} className="mr-1" />
          Verified
        </span>
        <p className="text-xs text-gray-500">
          Certificate validated successfully
        </p>
      </div>

    </div>
  );
};

export default CertificateCard;
