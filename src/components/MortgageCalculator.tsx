import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Info } from 'lucide-react';

interface MortgageCalculatorProps {
  propertyPrice: number;
}

const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({ propertyPrice }) => {
  const [downPayment, setDownPayment] = useState(propertyPrice * 0.2);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(20);
  const [showInfo, setShowInfo] = useState(false);

  const calculateMonthlyPayment = () => {
    const principal = propertyPrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const monthlyPayment =
      (principal *
        monthlyRate *
        Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    return isNaN(monthlyPayment) ? 0 : monthlyPayment;
  };

  const totalPayment = calculateMonthlyPayment() * loanTerm * 12;
  const totalInterest = totalPayment - (propertyPrice - downPayment);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <Calculator className="w-5 h-5 mr-2 text-indigo-600" />
          Mortgage Calculator
        </h3>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowInfo(!showInfo)}
          className="text-gray-500 hover:text-indigo-600"
        >
          <Info className="w-5 h-5" />
        </motion.button>
      </div>

      {showInfo && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-indigo-50 p-4 rounded-lg text-sm text-indigo-700"
        >
          <p>This calculator provides an estimate of your monthly mortgage payments.</p>
          <ul className="list-disc pl-4 mt-2 space-y-1">
            <li>Down Payment: Minimum 20% recommended</li>
            <li>Interest Rate: Current market rates vary between 7-10%</li>
            <li>Loan Term: Typically 15-30 years</li>
          </ul>
        </motion.div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Down Payment (₹)
          </label>
          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            min={0}
            max={propertyPrice}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <div className="mt-1 text-sm text-gray-500">
            {((downPayment / propertyPrice) * 100).toFixed(1)}% of property price
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Interest Rate (%)
          </label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            min={1}
            max={20}
            step={0.1}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Loan Term (Years)
          </label>
          <input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            min={5}
            max={30}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="bg-indigo-50 rounded-lg p-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-indigo-700">Monthly Payment:</span>
          <span className="text-lg font-bold text-indigo-700">
            ₹{calculateMonthlyPayment().toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-indigo-700">Total Interest:</span>
          <span className="font-medium text-indigo-700">
            ₹{totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-indigo-700">Total Payment:</span>
          <span className="font-medium text-indigo-700">
            ₹{totalPayment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;