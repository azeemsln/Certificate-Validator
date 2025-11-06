import {
  ArrowRight,
  BaggageClaim,
  Clock,
  Briefcase,
  Check,
  IdCard,
  Mail,
  Phone,
} from "lucide-react";
import calculateDurationInMonths from "../utils/calculateDurationInMonth";

// const certificateData = {
//   name: 'Rohit Verma',
//   email: 'example@gmail.com',
//   certificateNumber: '1234567890',
//   domain: 'ReactJS',
//   employeeId: 'EMP-123',
//   phone: '1234567890',
//   startDate: '12-12-2025',
//   endDate: '12-12-2025'
// }

const CertificateCard = ({ certificateData }) => {
  const data = certificateData.data;
  const durationText = calculateDurationInMonths(
    data?.startDate,
    data?.endDate
  );
  // console.log(durationText);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r bg-black/75 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{data?.name}</h2>
            <p className="text-blue-100 mt-1">{data?.Domain}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <p className="text-xs text-blue-100">Certificate #</p>
            <p className="text-lg font-mono font-semibold">
              {data?.certificateNumber}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Contact Information
            </h3>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <Mail className="text-blue-600" size={15} />
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm font-medium text-gray-900">
                  {data?.email}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <Phone className="text-blue-600" size={15} />
              </div>
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="text-sm font-medium text-gray-900">
                  {data?.phone}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Employment Details
            </h3>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <IdCard className="text-green-600" size={15} />
              </div>
              <div>
                <p className="text-xs text-gray-500">Employee ID</p>
                <p className="text-sm font-medium text-gray-900">
                  {data?.employeeID}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <Briefcase className="text-green-600" size={15} />
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
        <div className='mt-6 pt-6 border-t border-gray-200'>
        <h3 className='text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4 flex items-center'>
                        <Clock className='w-4 h-4 mr-2 text-blue-500' />
                        Duration
                    </h3>
                    
                    {/* Duration in Months Display */}
                    <div className='flex items-center justify-center bg-blue-50 border border-blue-200 rounded-xl p-6'>
                        <p className='text-xl font-extrabold text-blue-800 text-center'>
                            {durationText}
                        </p>
                    </div>
          <div className='flex items-center justify-between bg-gray-50 rounded-lg p-4'>
            <div className='text-center flex-1'>
              <p className='text-xs text-gray-500 mb-1'>Start Date</p>
              <p className='text-base font-semibold text-gray-900'>
                {data?.startDate?.split('T')[0].split('-').reverse().join('-')}
              </p>
            </div>
            <div className='px-4'>
                <ArrowRight className='text-gray-400' size={20}/>
            </div>
            <div className='text-center flex-1'>
              <p className='text-xs text-gray-500 mb-1'>End Date</p>
              <p className='text-base font-semibold text-gray-900'>
                {data?.endDate?.split('T')[0].split('-').reverse().join('-')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mx-2">
            <span className="bg-green-800 rounded-full p-1 mx-1">
              <Check size={12} className="text-green-100" />
            </span>
            Verified
          </span>
          <p className="text-xs text-gray-500">
            Certificate validated successfully
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
