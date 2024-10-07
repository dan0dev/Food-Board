import { AlertTriangle } from 'lucide-react';

const Footer = () => {
  return (
    <div className="mt-4 flex justify-between items-center text-sm">
      <a href="/terms-of-service" className="text-gray-400 hover:underline">
        Terms of Service
      </a>
      <button
        className="flex items-center gap-1 text-gray-400 hover:text-gray-300"
        onClick={() => alert('Report a bug')}
      >
        <AlertTriangle className="h-4 w-4" />
        Report a bug
      </button>
    </div>
  );
};

export default Footer;
