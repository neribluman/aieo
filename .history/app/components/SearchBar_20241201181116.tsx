import { motion } from 'framer-motion';
import { SearchIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  isScanning: boolean;
  onSearch: () => void;
}

export default function SearchBar({
  value,
  onChange,
  onFocus,
  onBlur,
  isScanning,
  onSearch
}: SearchBarProps) {
  return (
    <div className="relative">
      {/* Pulse Animation */}
      <motion.div
        animate={{
          scale: [1, 1.02, 1],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl"
      />

      <div className="relative flex items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder="Enter your company URL or name"
          className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-full text-white placeholder-blue-200/50 focus:outline-none focus:border-blue-400 transition-all duration-300"
        />
        
        <button
          onClick={onSearch}
          disabled={isScanning}
          className="absolute right-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-medium text-white hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
        >
          {isScanning ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full"
              />
              Scanning
            </>
          ) : (
            <>
              <span>Reveal</span>
              <ArrowRightIcon className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
} 